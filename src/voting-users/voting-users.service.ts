import { BadRequestException, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { compare, genSalt, hash } from 'bcrypt';
import { GiveVoteDto } from 'src/voting-users/dto/give-vote.dto';
import { ConfigService } from '../shared/config/config.service';
import { JwtPayload } from 'src/users/auth/jwt-payload.model';
import { UserDto } from 'src/users/dto/user.dto';
import { User } from 'src/users/user.entity';
import { UserVoteDto } from 'src/voting-users/dto/user-vote.dto';
import { giveVoteEntity } from 'src/voting-users/give-vote.entity';
import { UsersService } from 'src/users/users.service';
import { NominationOrderService } from 'src/nomination-order/services/nomination-order.service';


@Injectable()
export class VotingUsersService {
    private readonly jwtPrivateKey: string;

    constructor(
        @Inject('VotingUsersRepository')
        private readonly VotingUsersRepository: typeof giveVoteEntity,
        private readonly configService: ConfigService,
        private readonly usersService: UsersService,
        private readonly nominationOrderService: NominationOrderService,
      ) {
        this.jwtPrivateKey = this.configService.jwtConfig.privateKey;
      }

    async giveVote( UserFrom: number, nominationOrderId: number, range: number): Promise<UserVoteDto>  {
        const giveVoteDB = new giveVoteEntity();
        try {
            const nominationOrder = await this.nominationOrderService.findById(nominationOrderId) 
            const userToNomination = nominationOrder.userId

            const userToUsers = await this.usersService.getUserById(userToNomination)
            const userToUsersState = userToUsers.state

            const userFrom = await this.usersService.getUserById(UserFrom)
            const userFromState = userFrom.state
            
            if (userToUsersState != userFromState) {
                throw new HttpException(
                  'states must match.',
                  HttpStatus.BAD_REQUEST,
                );
            }

            if (UserFrom === userToNomination) {
                throw new HttpException(
                "You cann't vote for yourself.",
                HttpStatus.BAD_REQUEST,
                );
            }

            giveVoteDB.user_id = UserFrom;
            giveVoteDB.nomination_order_id = nominationOrderId;
            giveVoteDB.range = range;
            
            try {
              const data = await giveVoteDB.save();
              return new UserVoteDto(data);
            } catch (err) {
              throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
            }
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




    async findAll() {
        const allVotes = await this.VotingUsersRepository.findAll<giveVoteEntity>({
        order: [['id', 'ASC']],
        });
        return allVotes.map(votes => new UserVoteDto(votes));
    }
}