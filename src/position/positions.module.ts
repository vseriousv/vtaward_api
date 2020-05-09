import { Module } from '@nestjs/common';
import { PositionsController } from './positions.controller';
import { positionsProviders } from './positions.provider';
import { DatabaseModule } from './../database/database.module';
import { PositionsService } from './positions.service';
// import {JwtStrategy} from '../users/auth/jwt-strategy';

@Module({
  imports: [DatabaseModule],
  controllers: [PositionsController],
  providers: [PositionsService, ...positionsProviders],
  exports: [PositionsService],
})
export class PositionsModule {}
