import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { fileProviders } from './files.provider';
import { DatabaseModule } from './../database/database.module';
import { FilesService } from './files.service';

// import {JwtStrategy} from '../users/auth/jwt-strategy';

@Module({
  imports: [DatabaseModule],
  controllers: [FilesController],
  providers: [FilesService, ...fileProviders],
  exports: [FilesService],
})
export class FilesModule {}
