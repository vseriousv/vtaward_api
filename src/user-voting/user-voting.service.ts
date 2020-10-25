import { BadRequestException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { UserVotingEntity } from './entities/user-voting.entity';
import { UsersVotingResponseDto } from './dto/users-voting-response.dto';
import { User } from '../users/user.entity';
import { NominationOrderEntity } from '../nomination-order/entities/nomination-order.entity';
import { UsersVotingDto } from './dto/users-voting.dto';
import { CreateUsersVotingDto } from './dto/create-users-voting.dto';
import { NominationOrderService } from '../nomination-order/nomination-order.service';
import { UsersService } from '../users/users.service';
import { ResultUserVotingDto } from './dto/result-user-voting.dto';
import { QueryTypes } from 'sequelize';

export type TValidation = {
  status: boolean;
  error: string;
}

@Injectable()
export class UserVotingService {

  constructor(
    @Inject('UserVotingRepository')
    private readonly userVotingRepository: typeof UserVotingEntity,
    @Inject(forwardRef(() => NominationOrderService))
    private readonly nominationOrderService: NominationOrderService,
    private readonly usersService: UsersService,
  ) {
  }

  async findAll(where, limit, offset): Promise<UsersVotingResponseDto> {
    try {
      const { count, rows } = await this.userVotingRepository.findAndCountAll<UserVotingEntity>({
        where,
        limit,
        offset,
        order: [['id', 'ASC']],
        include: [
          {
            model: User,
            as: 'user',
          },
          {
            model: NominationOrderEntity,
            as: 'nominationOrder',
          },
        ],
      });
      return {
        count: rows.length,
        rows: rows.map(item => new UsersVotingDto(item)),
      };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async findAllRegionAndNomination(stateId: number, nominationId: number): Promise<UsersVotingResponseDto> {
    try {
      const { rows } = await this.userVotingRepository.findAndCountAll<UserVotingEntity>({
        order: [['id', 'ASC']],
        include: [
          {
            model: User,
            as: 'user',
          },
          {
            model: NominationOrderEntity,
            as: 'nominationOrder',
            where: {
              nominationId,
            },
            include: [
              {
                model: User,
                as: 'user',
                where: {
                  stateId,
                },
              },
            ],
          },
        ],
      });
      return {
        count: rows.length,
        rows: rows.map(item => new UsersVotingDto(item)),
      };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async findById(id: number): Promise<UsersVotingDto> {
    try {
      return await this.userVotingRepository.findByPk<UserVotingEntity>(
        id,
        {
          include: [
            {
              model: User,
              as: 'user',
            },
            {
              model: NominationOrderEntity,
              as: 'nominationOrder',
            },
          ],
        });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async create(
    userFromId: number,
    createUserVoting: CreateUsersVotingDto,
  ): Promise<UsersVotingDto> {
    try {
      const userVoting = new UserVotingEntity();

      userVoting.userFromId = userFromId;
      userVoting.nominationOrderId = createUserVoting.nominationOrderId;
      userVoting.range = createUserVoting.range;
      userVoting.type = createUserVoting.type;
      const validate = await this.validationCreate(userVoting);
      if (validate.status === false) {
        throw validate.error;
      }

      const userVotingData = await userVoting.save();

      return this.findById(userVotingData.id);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async validationCreate(userVoting: UserVotingEntity): Promise<TValidation> {
    // Проверка отправленного значения голоса
    if (userVoting.range < 1 || userVoting.range > 3) {
      return { status: false, error: 'Range value only 1, 2, 3' };
    }

    // Проверка из оставшихся значений голосов в данной номинации
    const nominationOrder = await this.nominationOrderService.findById(userVoting.nominationOrderId);
    const votesHave = await this.leftVotes(nominationOrder.nominationId, userVoting.userFromId, userVoting.nominationOrderId);
    if (!votesHave.votes.includes(userVoting.range)) {
      return { status: false, error: 'This vote cannot be gifted to this member' };
    }

    return {
      status: true,
      error: '',
    };
  }

  async leftVotes(nominationId, userFromId, nominationOrderId): Promise<{ votes: number[], error: string }> {
    try {
      // нельзя голосовать за себя, доступно 0 голосов
      const nominationOrder = await this.nominationOrderService.findById(nominationOrderId);
      if (nominationOrder.userId === userFromId) {
        return { votes: [], error: 'no-self' };
      }

      // уже голосовал за этого номинанта в этой номинации
      const haveVoteIsNominationOrder = await this.findAll({ userFromId }, undefined, undefined);
      if (haveVoteIsNominationOrder.rows.find(item => Number(item.nominationOrderId) === Number(nominationOrderId))) {
        return { votes: [], error: 'is-have' };
      }

      // можно голосовать только за свой регион, доступно 0 голосов
      const userFrom = await this.usersService.getUserById(userFromId);
      if (nominationOrder.user.stateId !== userFrom.stateId) {
        return { votes: [], error: 'only-my-region' };
      }

      // сколько участников в данном регионе в данной номеинации?
      const allNominationOrderByNomination = await this.nominationOrderService.findAllPublic({ nominationId, stateId: userFrom.stateId });

      // какие голоса пользователь уже отдал в данной номеинации?
      const userVotesAll = await this.userVotingRepository.findAndCountAll<UserVotingEntity>({
        where: {
          userFromId,
        },
        include: [
          {
            model: User,
            as: 'user',
          },
          {
            model: NominationOrderEntity,
            as: 'nominationOrder',
            where: {
              nominationId,
            },
          },
        ],
      });
      const votesHave = userVotesAll.rows.map(item => Number(item.range));

      // если колчисетво участников равно двум, то общее колчисетво голосов 1  иначе 1, 2 и 3
      const defaultVotes = allNominationOrderByNomination.count <= 3 ? [1] : [1, 2, 3];

      // отдаем оставшиеся голоса
      return {
        votes: defaultVotes.filter(item => {
          if (!votesHave.includes(item)) {
            return item;
          }
        }),
        error: '',
      };
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async calculate(region: number, nomination: number)
  // :Promise<ResultUserVotingDto[]>
  {
    try {
      const resultObject = [];
      // получаем всех участников в данном регионе по этой номинации
      // const allNominationOrderByNomination = await this.nominationOrderService.findAllPublic({ nominationId: nomination, stateId: region });
      // console.log('allNominationOrderByNomination', allNominationOrderByNomination);


      // получаем все голоса в данном регионе по данной номинации (Для ранжирования)
      // const allVotesToNominationAndRegion = await this.findAllRegionAndNomination(region, nomination);
      // console.log('allVotesToNominationAndRegion', allVotesToNominationAndRegion);

      // Поулчаем сгруппированный список из базы данных по nominationId
      const groupByNominationID = await this.userVotingRepository.sequelize.query(`
        SELECT uv.nomination_order_id,
               SUM(uv.range)                            AS sum_votes,
               COUNT(uv.range)                          AS count_votes,
               SUM(uv.range)::decimal / COUNT(uv.range) AS average
        FROM user_voting uv
                 INNER JOIN nomination_order no ON uv.nomination_order_id = no.id
                 INNER JOIN users u ON no.user_id = u.id
        WHERE no.nomination_id = 1
          AND u.state_id = 6
        GROUP BY uv.nomination_order_id;
      `,
        {
          replacements: {nomination, region},
          type: QueryTypes.SELECT,
        },
      );

      console.log(groupByNominationID);

      return '';
      // resultObject.map(item => new ResultUserVotingDto(item));
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

}
