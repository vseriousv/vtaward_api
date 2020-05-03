import { Module } from '@nestjs/common';
import {CityController} from './city.controller';
import { cityProviders} from './city.provider';
import { DatabaseModule } from './../database/database.module';
import {CityService} from './city.service';
// import {JwtStrategy} from '../users/auth/jwt-strategy';

@Module({
  imports: [DatabaseModule],
  controllers: [CityController],
  providers: [CityService, ...cityProviders],
  exports: [CityService],
})
export class CityModule {}
