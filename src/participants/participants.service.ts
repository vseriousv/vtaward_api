import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Participant } from './participant.entity';
import { ParticipantDto } from './dto/participant.dto';
import { CreateParticipantDto } from './dto/creat-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { User } from '../users/user.entity';
import { Voting } from '../voting/voting.entity';

import { Position } from '../position/position.entity';
import { Section } from '../section/section.entity';
import { State } from '../state/state.entity';
import { City } from '../city/city.entity';
import { Nomination } from '../nomination/nomination.entity';
import { VoteService } from '../votes/votes.service';
import { Role } from '../shared/enum/role';
import { ParticipantWithVotesDto } from './dto/participantWithVotes.dto';

@Injectable()
export class ParticipantsService {
  constructor(
    @Inject('ParticipantRepository')
    private readonly participantRepository: typeof Participant,
    private readonly voteService: VoteService,
  ) {}

  async findAll() {
    const participants = await this.participantRepository.findAll<Participant>({
      include: [User, Voting],
      order: [['id', 'ASC']],
    });
    return participants.map(participant => new ParticipantDto(participant));
  }

  async findIsActive() {
    const participants = await this.participantRepository.findAll<Participant>({
      include: [
        {
          model: User,
          include: [Position, Section, State, City, Nomination]
        },
        {
          model: Voting,
          where: { is_active: true }
        }
      ],
      order: [['id', 'ASC']],
    });
    const userData = {users:[], votings:[]}
    participants.map(participant => {
        userData.users.push(participant.user_id);
        userData.votings.push(participant.voting_id);
    });
    const data = await this.voteService.findByUserIdTo(userData.users, userData.votings);
    const result =  userData.users.map(id => {
      return {
        user_id: id,
        committee_rating: 0,
        committee_votes: 0,
        committee_avg: 0,
        votes: 0,
        sum: 0,
      };
    });
    userData.users.forEach(element => {
      const index = userData.users.indexOf(element);
      for (const item in data) {
        if (element === data[item].user_to_id ) {
          if (data[item].userTo.role === Role.comittee) {
            result[index].committee_rating += 1;
            result[index].committee_votes += data[item].count_vote;
          } else {
            result[index].votes += 1;
          }
        }
      }
    });
    // console.log('result ==> ', result);
    return participants.map((participant,id) => {
      return new ParticipantWithVotesDto(participant, result[id])
    });
  }

  async getParticipant(id: string) {
    const participant = await this.participantRepository.findByPk<Participant>(
      id,
    );
    if (!participant) {
      throw new HttpException(
        'Participant with given id not found',
        HttpStatus.NOT_FOUND,
      );
    }
    return new ParticipantDto(participant);
  }

  async create(createParticipantDto: CreateParticipantDto) {
    try {
      const participant = new Participant();

      participant.user_id = createParticipantDto.user_id;
      participant.voting_id = createParticipantDto.voting_id;

      const participantsData = await participant.save();

      return new ParticipantDto(participantsData);
    } catch (err) {
      if (
        (err.name === 'SequelizeUniqueConstraintError' &&
          err.original.constraint === 'participants_value_ru_key') ||
        (err.name === 'SequelizeUniqueConstraintError' &&
          err.original.constraint === 'participants_value_en_key')
      ) {
        throw new HttpException(`'already exists`, HttpStatus.CONFLICT);
      }

      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: string, updateParticipantDto: UpdateParticipantDto) {
    const participant = await this.participantRepository.findByPk<Participant>(
      id,
    );
    if (!participant) {
      throw new HttpException('Participant not found.', HttpStatus.NOT_FOUND);
    }
    participant.user_id = updateParticipantDto.user_id || participant.user_id;
    participant.voting_id = updateParticipantDto.voting_id || participant.voting_id;

    try {
      const data = await participant.save();
      return new ParticipantDto(data);
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(id: string) {
    const participant = await this.participantRepository.findByPk<Participant>(
      id,
    );
    await participant.destroy();
    return new ParticipantDto(participant);
  }
}
