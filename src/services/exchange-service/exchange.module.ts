import { Global, Module } from '@nestjs/common';
import { ExchangeService } from './exchange.service';
import { databaseProviders } from '../../database/database.providers';
import { ConfigService } from '../../shared/config/config.service';

@Global()
@Module({
  providers: [
    ...databaseProviders,
    ConfigService,
    ExchangeService,
  ],
  exports: [],
  controllers: [],
})
export class ExchangeModule {}
