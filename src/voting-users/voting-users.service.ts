import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UserVoteDto } from './dto/user-vote.dto';
import { GiveVoteEntity } from './give-vote.entity';
import { UsersService } from '../users/users.service';
import { NominationOrderService } from '../nomination-order/services/nomination-order.service';


@Injectable()
export class VotingUsersService {
  constructor(
    @Inject('VotingUsersRepository')
    private readonly votingUsersRepository: typeof GiveVoteEntity,
    private readonly usersService: UsersService,
    private readonly nominationOrderService: NominationOrderService,
  ) {}

  async giveVote(UserFrom: number, nominationOrderId: number, range: number): Promise<UserVoteDto> {
    const giveVoteDB = new GiveVoteEntity();
    try {
      const nominationOrder = await this.nominationOrderService.findById(nominationOrderId);
      const userToNomination = nominationOrder.userId;

      const userToUsers = await this.usersService.getUserById(userToNomination);
      const userToUsersState = userToUsers.state;

      const userFrom = await this.usersService.getUserById(UserFrom);
      const userFromState = userFrom.state;

      if (userToUsersState !== userFromState) {
        throw new HttpException(
          'states must match.',
          HttpStatus.BAD_REQUEST,
        );
      }

      if (UserFrom === userToNomination) {
        throw new HttpException(
          'You cann\'t vote for yourself.',
          HttpStatus.BAD_REQUEST,
        );
      }

      giveVoteDB.userId = UserFrom;
      giveVoteDB.nominationOrderId = nominationOrderId;
      giveVoteDB.range = range;

      const data = await giveVoteDB.save();
      return new UserVoteDto(data);

    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }


  }

  /*     async getVotingAll() {
          const giveVote = await this.VotingUsersRepository.findAll<GiveVote>({
          order: [['id', 'ASC']],
          });
          return giveVote.map(giveVote => new GiveVoteDto(giveVote));
      }
   */


  // async findAll() {
  //   const allVotes = await this.votingUsersRepository.findAll<GiveVoteEntity>({
  //     order: [['id', 'ASC']],
  //   });
  //   return allVotes.map(votes => new UserVoteDto(votes));
  // }
}