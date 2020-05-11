import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Voting } from './voting.entity';
import { VotingDto } from './dto/voting.dto'
import { CreateVotingDto } from './dto/creat-voting.dto';
import { UpdateVotingDto } from './dto/update-voting.dto';

@Injectable()
export class VotingsService {
  constructor(
    @Inject('VotingRepository')
    private readonly votingRepository: typeof Voting,
  ) {}

  async getVotingAll() {
    const votings = await this.votingRepository.findAll<Voting>({
      order: [['id', 'ASC']],
    });
    return votings.map(voting => new VotingDto(voting));
  }

  async getVoting(id: number) {
    const voting = await this.votingRepository.findOne<Voting>({
      where: { id },
    });
    if (!voting) {
      throw new HttpException(
        'Voting with given code not found',
        HttpStatus.NOT_FOUND,
      );
    }
    return new VotingDto(voting);
  }

  async create(createVotingDto: CreateVotingDto) {
    try {
      const voting = new Voting();

      voting.year = createVotingDto.year;
      voting.type_voting = createVotingDto.type_voting.trim().toLowerCase();
      voting.is_active = createVotingDto.is_active || voting.is_active;

      const votingsData = await voting.save();

      return new VotingDto(votingsData);
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: string, updateVotingDto: UpdateVotingDto) {
    const voting = await this.votingRepository.findByPk<Voting>(id);
    if (!voting) {
      throw new HttpException('Voting not found.', HttpStatus.NOT_FOUND);
    }

    voting.year = updateVotingDto.year || voting.year;
    voting.type_voting = updateVotingDto.type_voting || voting.type_voting;
    voting.is_active = updateVotingDto.is_active != null ? updateVotingDto.is_active : voting.is_active;

    try {
      const data = await voting.save();
      return new VotingDto(data);
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(id: string) {
    const voting = await this.votingRepository.findByPk<Voting>(id);
    await voting.destroy();
    return new VotingDto(voting);
  }
}
