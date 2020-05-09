import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Participant } from './participant.entity';
import { ParticipantDto } from './dto/participant.dto';
import { CreateParticipantDto } from './dto/creat-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { User } from '../users/user.entity';

@Injectable()
export class ParticipantsService {
  constructor(
    @Inject('ParticipantRepository')
    private readonly participantRepository: typeof Participant,
  ) {}

  async findAll() {
    const participants = await this.participantRepository.findAll<Participant>({
      include: [User],
      order: [['id', 'ASC']],
    });
    return participants.map(participant => new ParticipantDto(participant));
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
      participant.year_voting = createParticipantDto.year_voting;
      participant.type_voting = createParticipantDto.type_voting;

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
    participant.year_voting =
      updateParticipantDto.year_voting || participant.year_voting;
    participant.type_voting =
      updateParticipantDto.type_voting || participant.type_voting;

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
