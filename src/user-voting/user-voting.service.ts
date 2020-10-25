import { BadRequestException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { UserVotingEntity } from './entities/user-voting.entity';
import { UsersVotingResponseDto } from './dto/users-voting-response.dto';
import { User } from '../users/user.entity';
import { NominationOrderEntity } from '../nomination-order/entities/nomination-order.entity';
import { UsersVotingDto } from './dto/users-voting.dto';
import { CreateUsersVotingDto } from './dto/create-users-voting.dto';
import { NominationOrderService } from '../nomination-order/nomination-order.service';
import { UsersService } from '../users/users.service';

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

  async leftVotes(nominationId, userFromId, nominationOrderId): Promise<{votes: number[], error: string}>{
    try {
      // нельзя голосовать за себя, доступно 0 голосов
      const nominationOrder = await this.nominationOrderService.findById(nominationOrderId);
      if (nominationOrder.userId === userFromId) {
        return { votes: [], error: 'no-self' };
      }

      // уже голосовал за этого номинанта в этой номинации
      const haveVoteIsNominationOrder = await this.findAll({userFromId}, undefined, undefined);
      if (haveVoteIsNominationOrder.rows.find(item => Number(item.nominationOrderId) === Number(nominationOrderId))) {
        return { votes: [], error: 'is-have' };
      }

      // можно голосовать только за свой регион, доступно 0 голосов
      const userFrom = await this.usersService.getUserById(userFromId);
      if (nominationOrder.user.stateId !== userFrom.stateId) {
        return { votes: [], error: 'only-my-region' };
      }

      // сколько участников в данном регионе в данной номеинации?
      const allNominationOrderByNomination = await this.nominationOrderService.findAllPublic({nominationId, stateId: userFrom.stateId});

      // если в данном регионе в данной номеинации 1 или 0 участников, то голосования нет
      if (allNominationOrderByNomination.count <=1) {
        return { votes: [], error: 'not-voting' };
      }

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
            }
          },
        ],
      });
      const votesHave = userVotesAll.rows.map(item => Number(item.range));

      // если колчисетво участников равно двум, то общее колчисетво голосов 1 и 2 иначе 1, 2 и 3
      const defaultVotes = allNominationOrderByNomination.count === 2 ? [1,2] : [1,2,3];

      // отдаем оставшиеся голоса
      return {
        votes: defaultVotes.filter(item => {
          if (!votesHave.includes(item)) {
            return item;
          }
        }),
        error: ''
      }
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

}
