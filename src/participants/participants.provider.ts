import { Participant } from './participant.entity';

export const participantsProviders = [
  { provide: 'ParticipantRepository', useValue: Participant },
];
