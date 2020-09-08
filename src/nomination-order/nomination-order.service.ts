import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { NominationOrderEntity } from './nomination-order.entity';
import { User } from '../users/user.entity';
import { Nomination } from '../nomination/nomination.entity';
import { NominationOrderFilesEntity } from './nomination-order-files.entity';
import { NominationOrderDto } from './dto/nomination-order.dto';
import { CreateNominationOrderDto } from './dto/create-nomination-order.dto';
import { TFormData } from '../shared/interfases/TFormData';

@Injectable()
export class NominationOrderService {
  constructor(
    @Inject('NominationOrderRepository')
    private readonly repository: typeof NominationOrderEntity,
  ) {}

  async findAll(
  ): Promise<{count: number, rows: NominationOrderDto[]}> {
    try {
      const { count, rows } = await this.repository.findAndCountAll<NominationOrderEntity>({
        include: [
          { model: User, as: 'user', },
          { model: Nomination, as: 'nomination', },
          { model: NominationOrderFilesEntity, as: 'files', }
        ],
        order: [
          ['id', 'ASC'],
          [{model: NominationOrderFilesEntity, as: 'files'}, 'id', 'ASC'],
        ],
      });
      return {
        count: rows.length,
        rows: rows.map(item => new NominationOrderDto(item)),
      }
    } catch (e) {
      throw new BadRequestException(e)
    }
  }


  async create(
    fileArray: [],
    createNominationOrderDto: CreateNominationOrderDto,
  ): Promise<NominationOrderEntity> {
    try {
      const nominationOrder = new NominationOrderEntity();

      nominationOrder.userId = createNominationOrderDto.userId;
      nominationOrder.nominationId = createNominationOrderDto.nominationId;
      nominationOrder.textRu = createNominationOrderDto.textRu;
      nominationOrder.textEn = createNominationOrderDto.textEn;
      const nominationOrderData = await nominationOrder.save();

      const fileData = fileArray.map((item: TFormData) => {
        return {
          nominationOrderId: nominationOrderData.id,
          filePath: `/nomination-orders/${item.filename}`
        }
      });
      NominationOrderFilesEntity.bulkCreate(fileData);

      return this.findById(nominationOrderData.id);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }


  async findById(id: number): Promise<NominationOrderEntity> {
    try {
      return this.repository.findByPk<NominationOrderEntity>(
        id,
        {
          include: [
            { model: User,  as: 'user', },
            { model: Nomination, as: 'nomination', },
            { model: NominationOrderFilesEntity, as: 'files', }
          ],
          order: [
            ['id', 'ASC'],
            [{model: NominationOrderFilesEntity, as: 'files'}, 'id', 'ASC'],
          ],
        });
    } catch (e) {
      throw new BadRequestException(e)
    }
  }


}
