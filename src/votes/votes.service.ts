import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Vote } from './vote.entity';
import { VoteDto } from './dto/vote.dto';
import { CreateVoteDto } from './dto/creat-vote.dto';
import { UpdateVoteDto } from './dto/update-vote.dto';
import { User } from '../users/user.entity';

@Injectable()
export class VoteService {
  constructor(
    @Inject('VoteRepository')
    private readonly voteRepository: typeof Vote,
  ) {}

  async findAll() {
    const votes = await this.voteRepository.findAll<Vote>({
      include: [User],
      order: [['id', 'ASC']],
    });
    return votes.map(vote => new VoteDto(vote));
  }

  async findFromAll(userId, votingId) {
    const votes = await this.voteRepository.findAll<Vote>({
      include: [User],
      where: {
        user_form_id: userId,
        voting_id: votingId,
      },
      order: [['id', 'ASC']],
    });
    return votes.map(vote => new VoteDto(vote));
  }

  async getVote(id: string) {
    const vote = await this.voteRepository.findByPk<Vote>(id);
    if (!vote) {
      throw new HttpException(
        'Vote with given id not found',
        HttpStatus.NOT_FOUND,
      );
    }
    return new VoteDto(vote);
  }

  // async getVoteFromId(from: string) {
  //   const votes = await this.voteRepository.findAll<Vote>({
  //     where:{
  //       'user_from_id': from,
  //     },
  //     order: [['id', 'ASC']],
  //   });
  //   return votes.map(vote => new VoteDto(vote));
  // }
  //
  // async getVoteToId(id: string) {
  //   const vote = await this.voteRepository.findByPk<Vote>(id);
  //   if (!vote) {
  //     throw new HttpException(
  //       'Vote with given id not found',
  //       HttpStatus.NOT_FOUND,
  //     );
  //   }
  //   return new VoteDto(vote);
  // }

  async create(createVoteDto: CreateVoteDto) {
    try {
      const vote = new Vote();

      vote.user_from_id = createVoteDto.user_from_id;
      vote.user_to_id = createVoteDto.user_to_id;
      vote.type_vote = createVoteDto.type_vote;
      vote.count_vote = createVoteDto.count_vote;
      vote.voting_id = createVoteDto.voting_id;

      const votesData = await vote.save();

      return new VoteDto(votesData);
    } catch (err) {
      if (
        (err.name === 'SequelizeUniqueConstraintError' &&
          err.original.constraint === 'votes_value_ru_key') ||
        (err.name === 'SequelizeUniqueConstraintError' &&
          err.original.constraint === 'votes_value_en_key')
      ) {
        throw new HttpException(`'already exists`, HttpStatus.CONFLICT);
      }

      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: string, updateVoteDto: UpdateVoteDto) {
    const vote = await this.voteRepository.findByPk<Vote>(id);
    if (!vote) {
      throw new HttpException('Vote not found.', HttpStatus.NOT_FOUND);
    }
    vote.user_from_id = updateVoteDto.user_from_id || vote.user_from_id;
    vote.user_to_id = updateVoteDto.user_to_id || vote.user_to_id;
    vote.type_vote = updateVoteDto.type_vote || vote.type_vote;
    vote.count_vote = updateVoteDto.count_vote || vote.count_vote;
    vote.voting_id = updateVoteDto.voting_id || vote.voting_id;

    try {
      const data = await vote.save();
      return new VoteDto(data);
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(id: string) {
    const vote = await this.voteRepository.findByPk<Vote>(id);
    await vote.destroy();
    return new VoteDto(vote);
  }
}
