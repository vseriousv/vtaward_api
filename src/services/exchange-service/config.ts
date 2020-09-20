import { IServiceConfig } from '../../shared/interfases/IServiceConfig';

export const Config: IServiceConfig = {
  serviceName: process.env.MARKET_SERVICE_NAME || 'ExchangeService',
};
