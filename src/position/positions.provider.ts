import { Position } from './position.entity';

export const positionsProviders = [
  { provide: 'PositionRepository', useValue: Position },
];
