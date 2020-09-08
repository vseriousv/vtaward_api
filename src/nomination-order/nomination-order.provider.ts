import { NominationOrderEntity } from './nomination-order.entity';

export const nominationOrderProvider = [{ provide: 'NominationOrderRepository', useValue: NominationOrderEntity }];