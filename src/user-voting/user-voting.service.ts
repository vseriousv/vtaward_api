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
import { Op, QueryTypes } from 'sequelize';
import { Role } from '../shared/enum/role';
import { UserVotingType } from '../shared/enum/user-voting-type';

export type TValidation = {
  status: boolean;
  error: string;
}

export type TGroupByNominationNumber = {
  nomination_order_id: number;
  sum_votes: number;
  count_votes: number;
  average: number;
  firstname_en: string;
  firstname_ru: string;
  lastname_en: string;
  lastname_ru: string;
  img: string;
}

export type TGroupByNominationID = {
  nomination_order_id: number;
  sum_votes: string;
  count_votes: string;
  average: string;
  firstname_en: string;
  firstname_ru: string;
  lastname_en: string;
  lastname_ru: string;
  img: string;
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
				where: {
					range: {
						[Op.ne]: 0,
					},
					...where
				},
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
						include: [
							{
								model: User,
								as: 'user',
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
      const validate = await this.validationCreate(userFromId, userVoting, createUserVoting.type);
      if (validate.status === false) {
        throw validate.error;
      }

      const userVotingData = await userVoting.save();

      return this.findById(userVotingData.id);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async validationCreate(userFromId: number, userVoting: UserVotingEntity, type: UserVotingType): Promise<TValidation> {
    // Проверка отправленного значения голоса
    if (userVoting.range < 1 || userVoting.range > 3) {
      return { status: false, error: 'Range value only 1, 2, 3' };
    }

    // Проверка из оставшихся значений голосов в данной номинации
    const nominationOrder = await this.nominationOrderService.findById(userVoting.nominationOrderId);
		const userFrom = await this.usersService.getUserById(userFromId);
		let votesHave;
		if (type === UserVotingType.сommission) {
			votesHave = await this.leftVotesCommission(nominationOrder.nominationId, userVoting.userFromId, userVoting.nominationOrderId);
		} else {
			votesHave = await this.leftVotes(nominationOrder.nominationId, userVoting.userFromId, userVoting.nominationOrderId);
		}
    if (!votesHave.votes.includes(userVoting.range)) {
      return { status: false, error: 'This vote cannot be gifted to this member' };
    }

    return {
      status: true,
      error: '',
    };
  }

  async leftVotesCommission(nominationId, userFromId, nominationOrderId): Promise<{ votes: number[], error: string }> {
		try {
			// нельзя голосовать за себя, доступно 0 голосов
			const nominationOrder = await this.nominationOrderService.findById(nominationOrderId);
			if (nominationOrder.userId === userFromId) {
				return { votes: [], error: 'no-self' };
			}

			// уже голосовал за этого номинанта в этой номинации
			const haveVoteIsNominationOrder = await this.findAll({ userFromId, type: 'сommission' }, undefined, undefined);
			if (haveVoteIsNominationOrder.rows.find(item => Number(item.nominationOrderId) === Number(nominationOrderId))) {
				return { votes: [], error: 'is-have' };
			}

			// const userFrom = await this.usersService.getUserById(userFromId);
			// можно голосовать только за свой регион, доступно 0 голосов
			// if (nominationOrder.user.stateId !== userFrom.stateId) {
			// 	return { votes: [], error: 'only-my-region' };
			// }

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
			const defaultVotes = [1, 2, 3];

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

  async calculate(region: number, nomination: number): Promise<ResultUserVotingDto[]> {
    try {
      // Поулчаем сгруппированный список из базы данных по nominationId
      const groupByNominationID: TGroupByNominationID[] = await this.userVotingRepository.sequelize.query(`
        SELECT uv.nomination_order_id,
               SUM(uv.range)          AS sum_votes,
               COUNT(uv.range) - 1    AS count_votes,
               u.firstname_en,
               u.firstname_ru,
               u.lastname_en,
               u.lastname_ru,
               u.img
        FROM user_voting uv
                 JOIN nomination_order no ON uv.nomination_order_id = no.id
                 JOIN users u ON no.user_id = u.id
        WHERE no.nomination_id = :nomination
          AND u.state_id = :region
        GROUP BY uv.nomination_order_id,
                 u.firstname_en,
                 u.firstname_ru,
                 u.lastname_en,
                 u.lastname_ru,
                 u.img;
      `,
        {
          replacements: { nomination, region },
          type: QueryTypes.SELECT,
        },
      );

      const groupByNominationNumber: TGroupByNominationNumber[] = groupByNominationID.map(item => {
        return {
          nomination_order_id: Number(item.nomination_order_id),
          sum_votes: Number(item.sum_votes),
          count_votes: Number(item.count_votes),
          average: Number(item.count_votes) === 0 ? 0 : Number(item.sum_votes) / Number(item.count_votes),
          firstname_en: item.firstname_en,
          firstname_ru: item.firstname_ru,
          lastname_en: item.lastname_en,
          lastname_ru: item.lastname_ru,
          img: item.img,
        };
      });

      return this.rankAll(groupByNominationNumber).map(item => new ResultUserVotingDto(
        item.nomination_order_id,
        item.firstname_en,
        item.firstname_ru,
        item.lastname_en,
        item.lastname_ru,
        item.img,
        item.sum_votes,
        item.count_votes,
        item.average,
        item.count_votes === 0 ? 0 : item.result_rank,
      ));
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

	async calculateCommission(nomination: number): Promise<ResultUserVotingDto[]> {
		try {
			// Поулчаем сгруппированный список из базы данных по nominationId
			const groupByNominationID: TGroupByNominationID[] = await this.userVotingRepository.sequelize.query(`
        SELECT uv.nomination_order_id,
               SUM(uv.range)          AS sum_votes,
               COUNT(uv.range) - 1    AS count_votes,
               u.firstname_en,
               u.firstname_ru,
               u.lastname_en,
               u.lastname_ru,
               u.img
        FROM user_voting uv
                 JOIN nomination_order no ON uv.nomination_order_id = no.id
                 JOIN users u ON no.user_id = u.id
        WHERE no.nomination_id = :nomination AND uv.type = 'сommission'
        GROUP BY uv.nomination_order_id,
                 u.firstname_en,
                 u.firstname_ru,
                 u.lastname_en,
                 u.lastname_ru,
                 u.img;
      `,
				{
					replacements: { nomination },
					type: QueryTypes.SELECT,
				},
			);

			const groupByNominationNumber: TGroupByNominationNumber[] = groupByNominationID.map(item => {
				return {
					nomination_order_id: Number(item.nomination_order_id),
					sum_votes: Number(item.sum_votes),
					count_votes: Number(item.count_votes),
					average: Number(item.count_votes) === 0 ? 0 : Number(item.sum_votes) / Number(item.count_votes),
					firstname_en: item.firstname_en,
					firstname_ru: item.firstname_ru,
					lastname_en: item.lastname_en,
					lastname_ru: item.lastname_ru,
					img: item.img,
				};
			});

			return this.rankAll(groupByNominationNumber).map(item => new ResultUserVotingDto(
				item.nomination_order_id,
				item.firstname_en,
				item.firstname_ru,
				item.lastname_en,
				item.lastname_ru,
				item.img,
				item.sum_votes,
				item.count_votes,
				item.average,
				item.count_votes === 0 ? 0 : item.result_rank,
			));
		} catch (e) {
			throw new BadRequestException(e);
		}
	}

  rankSumF(arr) {
    const arrSort = arr.sort((a, b) => a.sum_votes < b.sum_votes ? 1 : -1);
    const result = [];
    let value = 0;
    let rank = 0;
    let vakant = arrSort.length;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < arrSort.length; i++) {
      if (arrSort[i].sum_votes !== value) {
        value = arrSort[i].sum_votes;
        const sovp = arrSort.filter(item => item.sum_votes === arrSort[i].sum_votes).length;
        let sumVakant = 0;
        for (let j = 0; j < sovp; j++) {
          sumVakant += vakant;
          vakant--;
        }
        rank = sumVakant / sovp;
      }
      result.push({
        nomination_order_id: arrSort[i].nomination_order_id,
        sum_votes: arrSort[i].sum_votes,
        count_votes: arrSort[i].count_votes,
        average: arrSort[i].average,
        firstname_en: arrSort[i].firstname_en,
        firstname_ru: arrSort[i].firstname_ru,
        lastname_en: arrSort[i].lastname_en,
        lastname_ru: arrSort[i].lastname_ru,
        img: arrSort[i].img,
        sum_rank: rank,
      });
    }
    return result.sort((a, b) => a.nomination_order_id > b.nomination_order_id ? 1 : -1);
  }

  rankCountF(arr) {
    const arrSort = arr.sort((a, b) => a.count_votes < b.count_votes ? 1 : -1);
    const result = [];
    let value = 0;
    let rank = 0;
    let vakant = arrSort.length;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < arrSort.length; i++) {
      if (arrSort[i].count_votes !== value) {
        value = arrSort[i].count_votes;
        const sovp = arrSort.filter(item => item.count_votes === arrSort[i].count_votes).length;
        let sumVakant = 0;
        for (let j = 0; j < sovp; j++) {
          sumVakant += vakant;
          vakant--;
        }
        rank = sumVakant / sovp;
      }
      result.push({
        nomination_order_id: arrSort[i].nomination_order_id,
        sum_votes: arrSort[i].sum_votes,
        count_votes: arrSort[i].count_votes,
        average: arrSort[i].average,
        firstname_en: arrSort[i].firstname_en,
        firstname_ru: arrSort[i].firstname_ru,
        lastname_en: arrSort[i].lastname_en,
        lastname_ru: arrSort[i].lastname_ru,
        img: arrSort[i].img,
        sum_rank: arrSort[i].sum_rank,
        count_rank: rank,
      });
    }
    return result.sort((a, b) => a.nomination_order_id > b.nomination_order_id ? 1 : -1);
  }

  rankAverageF(arr) {
    const arrSort = arr.sort((a, b) => a.average < b.average ? 1 : -1);
    const result = [];
    let value = 0;
    let rank = 0;
    let vakant = arrSort.length;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < arrSort.length; i++) {
      if (arrSort[i].average !== value) {
        value = arrSort[i].average;
        const sovp = arrSort.filter(item => item.average === arrSort[i].average).length;
        let sumVakant = 0;
        for (let j = 0; j < sovp; j++) {
          sumVakant += vakant;
          vakant--;
        }
        rank = sumVakant / sovp;
      }
      result.push({
        nomination_order_id: arrSort[i].nomination_order_id,
        sum_votes: arrSort[i].sum_votes,
        count_votes: arrSort[i].count_votes,
        average: arrSort[i].average,
        firstname_en: arrSort[i].firstname_en,
        firstname_ru: arrSort[i].firstname_ru,
        lastname_en: arrSort[i].lastname_en,
        lastname_ru: arrSort[i].lastname_ru,
        img: arrSort[i].img,
        sum_rank: arrSort[i].sum_rank,
        count_rank: arrSort[i].count_rank,
        average_rank: rank,
        sumAll_rank: arrSort[i].sum_rank + arrSort[i].count_rank + rank,
      });
    }
    return result.sort((a, b) => a.nomination_order_id > b.nomination_order_id ? 1 : -1);
  }

  result_rankF(arr) {
    const arrSort = arr.sort((a, b) => a.sumAll_rank < b.sumAll_rank ? 1 : -1);
    const result = [];
    let value = 0;
    let rank = 0;
    let vakant = arrSort.length;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < arrSort.length; i++) {
      if (arrSort[i].sumAll_rank !== value) {
        value = arrSort[i].sumAll_rank;
        const sovp = arrSort.filter(item => item.sumAll_rank === arrSort[i].sumAll_rank).length;
        let sumVakant = 0;
        for (let j = 0; j < sovp; j++) {
          sumVakant += vakant;
          vakant--;
        }
        rank = sumVakant / sovp;
      }
      result.push({
        nomination_order_id: arrSort[i].nomination_order_id,
        sum_votes: arrSort[i].sum_votes,
        count_votes: arrSort[i].count_votes,
        average: arrSort[i].average,
        firstname_en: arrSort[i].firstname_en,
        firstname_ru: arrSort[i].firstname_ru,
        lastname_en: arrSort[i].lastname_en,
        lastname_ru: arrSort[i].lastname_ru,
        img: arrSort[i].img,
        result_rank: rank,
      });
    }
    return result;
  }

  rankAll(arr) {
    const rankSum = this.rankSumF(arr);
    const rankCount = this.rankCountF(rankSum);
    const rankAverage = this.rankAverageF(rankCount);
    return this.result_rankF(rankAverage);
  }

}
