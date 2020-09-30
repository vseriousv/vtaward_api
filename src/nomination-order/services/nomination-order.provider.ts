import { NominationOrderEntity } from '../entities/nomination-order.entity';

export const nominationOrderProvider = [{ provide: 'NominationOrderRepository', useValue: NominationOrderEntity }];