import { City } from './city.entity';

export const cityProviders = [{ provide: 'CityRepository', useValue: City }];