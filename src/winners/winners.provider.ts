import { Winner } from './winner.entity';

export const winnerProviders = [{ provide: 'WinnerRepository', useValue: Winner }];