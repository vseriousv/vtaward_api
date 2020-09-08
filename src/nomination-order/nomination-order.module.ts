import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { NominationOrderController } from './nomination-order.controller';
import { NominationOrderService } from './nomination-order.service';
import { nominationOrderProvider } from './nomination-order.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [NominationOrderController],
  providers: [NominationOrderService, ...nominationOrderProvider],
  exports: [NominationOrderService],
})
export class NominationOrderModule {}
