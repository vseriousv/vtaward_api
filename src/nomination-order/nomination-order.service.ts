import { BadRequestException, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { NominationOrderEntity } from './nomination-order.entity';
import { User } from '../users/user.entity';
import { Nomination } from '../nomination/nomination.entity';
import { NominationOrderFilesEntity } from './nomination-order-files.entity';
import { NominationOrderDto } from './dto/nomination-order.dto';
import { CreateNominationOrderDto } from './dto/create-nomination-order.dto';
import { TFormData, TFormFileData } from '../shared/interfases/TFormData';
import { UpdateNominationOrderDto } from './dto/update-nomination-order.dto';
import { State } from '../state/state.entity';
import { City } from '../city/city.entity';
import { Section } from '../section/section.entity';
import { Position } from '../position/position.entity';

@Injectable()
export class NominationOrderService {
  constructor(
    @Inject('NominationOrderRepository')
    private readonly repository: typeof NominationOrderEntity,
  ) {}

  fileParseData(fileArray: TFormData[], id: number): TFormFileData[] {
    return fileArray.map((item: TFormData): TFormFileData => {
      return {
        nominationOrderId: id,
        filePath: `/nomination-orders/${item.filename}`
      }
    });
  }

  async findAll(): Promise<{count: number, rows: NominationOrderDto[]}> {
    try {
      const { count, rows } = await this.repository.findAndCountAll<NominationOrderEntity>({
        include: [
          {
            model: User,
            as: 'user',
            identifier: 'userId',
            include: [
              { model: State, as: 'state',},
              { model: Nomination, as: 'nomination',},
              { model: City, as: 'city',},
              { model: Section, as: 'section',},
              { model: Position, as: 'position',}
            ],
          },
          {
            model: User,
            as: 'userOrder',
            identifier: 'userFrom',
            include: [
              { model: State, as: 'state',},
              { model: Nomination, as: 'nomination',},
              { model: City, as: 'city',},
              { model: Section, as: 'section',},
              { model: Position, as: 'position',}
            ],
          },
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
      nominationOrder.userFrom = createNominationOrderDto.userFrom;
      nominationOrder.nominationId = createNominationOrderDto.nominationId;
      nominationOrder.textRu = createNominationOrderDto.textRu;
      nominationOrder.textEn = createNominationOrderDto.textEn;
      nominationOrder.public = createNominationOrderDto.public;
      const nominationOrderData = await nominationOrder.save();

      const fileData = this.fileParseData(fileArray, nominationOrderData.id)
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
            {
              model: User,
              as: 'user',
              foreignKey: 'nomination_order_userId_fkey',
              identifier: 'userId',
              include: [
                { model: State, as: 'state',},
                { model: Nomination, as: 'nomination',},
                { model: City, as: 'city',},
                { model: Section, as: 'section',},
                { model: Position, as: 'position',}
              ],
            },
            {
              model: User,
              as: 'userOrder',
              foreignKey: 'nomination_order_user_from_fkey',
              identifier: 'userFrom',
              include: [
                { model: State, as: 'state',},
                { model: Nomination, as: 'nomination',},
                { model: City, as: 'city',},
                { model: Section, as: 'section',},
                { model: Position, as: 'position',}
              ],
            },
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



  async changeFieldsById(
    id: number,
    updateNominationOrderDto: UpdateNominationOrderDto,
  ): Promise<NominationOrderEntity> {
    try {
      const nominationOrderOld = await this.findById(id);
      if (!nominationOrderOld) {
        throw new HttpException('Nomination order not found.', HttpStatus.NOT_FOUND);
      }



      updateNominationOrderDto = {
        userId: updateNominationOrderDto.userId || nominationOrderOld.userId,
        userFrom: updateNominationOrderDto.userFrom || nominationOrderOld.userFrom,
        nominationId: updateNominationOrderDto.nominationId || nominationOrderOld.nominationId,
        textRu: updateNominationOrderDto.textRu || nominationOrderOld.textRu,
        textEn: updateNominationOrderDto.textEn || nominationOrderOld.textEn,
        public: updateNominationOrderDto.public !== null ? updateNominationOrderDto.public : nominationOrderOld.public,
      }

      await NominationOrderEntity.update(updateNominationOrderDto, { where: {id}});

      return this.findById(id);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }


}