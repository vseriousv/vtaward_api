import { ContentMain } from './contentMain.entity';

export const contentMainProviders = [{ provide: 'ContentMainRepository', useValue: ContentMain }];
