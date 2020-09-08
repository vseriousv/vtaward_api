import { ApiProperty } from '@nestjs/swagger';
import { NominationOrderFilesEntity } from '../nomination-order-files.entity';
import { NominationOrderDto } from './nomination-order.dto';


export class NominationOrderFilesDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  readonly filePath: string;

  @ApiProperty()
  readonly nominationOrderId: number;

  @ApiProperty()
  readonly nominationOrder: NominationOrderDto;

  constructor(
    nominationOrderFilesEntity: NominationOrderFilesEntity
  ) {
    this.id = nominationOrderFilesEntity.id;
    this.filePath = nominationOrderFilesEntity.filePath;
    this.nominationOrderId = nominationOrderFilesEntity.nominationOrderId;
    this.nominationOrder = nominationOrderFilesEntity.nominationOrder;
  }
}