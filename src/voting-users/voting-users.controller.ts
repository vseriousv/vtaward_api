import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { VotingUsersService } from './voting-users.service';
import { GiveVoteDto } from './dto/give-vote.dto';
import { UserVoteDto } from './dto/user-vote.dto';

@Controller('votingUsers')
@ApiTags('voting-Users')
export class VotingUsersController {
  constructor(private readonly votingUsersService: VotingUsersService) {}

    @Post()
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    giveVote(
        @Body() giveVoteDto: GiveVoteDto, @Req() request): Promise<UserVoteDto> {
        return this.votingUsersService.giveVote(
            request.user.id,
            giveVoteDto.nominationOrderId,
            giveVoteDto.range,
          );
    }


/*     @Get()
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @ApiOkResponse({ type: [GiveVoteDto] })
    findAll(): Promise<GiveVoteDto[]> {
      return this.votingUsersService.getVoteAll();
    } */


    // @Get()
    // @ApiBearerAuth()
    // @UseGuards(AuthGuard('jwt'))
    // @ApiOkResponse({ type: [UserVoteDto] })
    // findAll(): Promise<UserVoteDto[]> {
    //   return this.votingUsersService.findAll();
    // }
}