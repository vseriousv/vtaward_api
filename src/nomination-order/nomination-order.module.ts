import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { NominationOrderController } from './controllers/nomination-order.controller';
import { NominationOrderService } from './services/nomination-order.service';
import { nominationOrderProvider } from './services/nomination-order.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [NominationOrderController],
  providers: [
    NominationOrderService,
    ...nominationOrderProvider
  ],
  exports: [NominationOrderService],
})
export class NominationOrderModule {}
