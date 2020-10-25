import { NominationOrderEntity } from './entities/nomination-order.entity';
import { NominationOrderFilesEntity } from './entities/nomination-order-files.entity';

export const nominationOrderProvider = [
  { provide: 'NominationOrderRepository', useValue: NominationOrderEntity },
  { provide: 'NominationOrderFilesRepository', useValue: NominationOrderFilesEntity}
];