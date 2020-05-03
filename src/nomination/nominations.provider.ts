import { Nomination} from './nomination.entity';

export const nominationProviders = [{ provide: 'NominationRepository', useValue: Nomination }];