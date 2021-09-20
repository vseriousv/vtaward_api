import { BadRequestException, forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { NominationOrderEntity } from './entities/nomination-order.entity';
import { User } from '../users/user.entity';
import { Nomination } from '../nomination/nomination.entity';
import { NominationOrderFilesEntity } from './entities/nomination-order-files.entity';
import { NominationOrderDto } from './dto/nomination-order.dto';
import { CreateNominationOrderDto } from './dto/create-nomination-order.dto';
import { TFormData, TFormFileData } from '../shared/interfases/TFormData';
import { UpdateNominationOrderDto } from './dto/update-nomination-order.dto';
import { State } from '../state/state.entity';
import { UserVotingService } from '../user-voting/user-voting.service';
import { UsersService } from '../users/users.service';
import { Role } from '../shared/enum/role';

@Injectable()
export class NominationOrderService {
  constructor(
    @Inject('NominationOrderRepository')
    private readonly repository: typeof NominationOrderEntity,
    @Inject('NominationOrderFilesRepository')
    private readonly filesRepository: typeof NominationOrderFilesEntity,
    @Inject(forwardRef(() => UserVotingService))
    private readonly userVotingService: UserVotingService,
		private readonly _usersService: UsersService,
  ) {}

  fileParseData(fileArray: TFormData[], id: number): TFormFileData[] {
    return fileArray.map((item: TFormData): TFormFileData => {
      return {
        nominationOrderId: id,
        filePath: `/nomination-orders/${item.filename}`
      }
    });
  }

  async findAll(noSelected: boolean): Promise<{count: number, rows: NominationOrderDto[]}> {
    try {
      const { count, rows } = await this.repository.findAndCountAll<NominationOrderEntity>({
        where: noSelected === true ? {
          isSelected: false
        } : {},
        include: [
          {
            model: User,
            as: 'user',
            identifier: 'userId',
            include: [
              { model: State, as: 'state',},
            ],
          },
          {
            model: User,
            as: 'userOrder',
            identifier: 'userFrom',
            include: [
              { model: State, as: 'state',},
            ],
          },
          { model: Nomination, as: 'nomination', },
          { model: NominationOrderFilesEntity, as: 'files', }
        ],
        order: [
          ['id', 'DESC'],
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

  // tslint:disable-next-line:no-unnecessary-initializer
  async findAllPublic(where, limit = undefined, offset = undefined): Promise<{count: number, rows: NominationOrderDto[]}> {
    try {
			const filter = { public: true };
			if (where.nominationId) filter['nominationId'] = where.nominationId;
      const { count, rows } = await this.repository.findAndCountAll<NominationOrderEntity>({
        where: filter,
        limit,
        offset,
        include: [
          {
            model: User,
            as: 'user',
            where: where.stateId ?  {
              stateId: where.stateId,
            } : {},
            identifier: 'userId',
            include: [
              { model: State, as: 'state',},
            ],
          },
          { model: Nomination, as: 'nomination', },
          { model: NominationOrderFilesEntity, as: 'files', }
        ],
        order: [
          ['id', 'DESC'],
          [{model: NominationOrderFilesEntity, as: 'files'}, 'id', 'ASC'],
        ]
      });

      return {
        count: rows.length,
        rows: rows.map(item => new NominationOrderDto(item)),
      }
    } catch (e) {
      throw new BadRequestException(e)
    }
  }

  async findAllSelected(): Promise<{count: number, rows: NominationOrderDto[]}> {
    try {
      const { count, rows } = await this.repository.findAndCountAll<NominationOrderEntity>({
        where: { is_selected: true },
        include: [
          {
            model: User,
            as: 'user',
            identifier: 'userId',
            include: [
              { model: State, as: 'state',},
            ],
          },
          { model: Nomination, as: 'nomination', },
          { model: NominationOrderFilesEntity, as: 'files', }
        ],
        order: [
          ['id', 'DESC'],
          [{model: NominationOrderFilesEntity, as: 'files'}, 'id', 'ASC'],
        ]
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
  ): Promise<NominationOrderDto> {
    try {
      const nominationOrder = new NominationOrderEntity();

      nominationOrder.userId = createNominationOrderDto.userId;
      nominationOrder.userFrom = createNominationOrderDto.userFrom;
      nominationOrder.nominationId = createNominationOrderDto.nominationId;
      nominationOrder.textRu = createNominationOrderDto.textRu;
      nominationOrder.textEn = createNominationOrderDto.textEn;
      nominationOrder.public = createNominationOrderDto.public;
      nominationOrder.isSelected = createNominationOrderDto.isSelected;
      nominationOrder.isNew = createNominationOrderDto.isNew;
      const nominationOrderData = await nominationOrder.save();

      const fileData = this.fileParseData(fileArray, nominationOrderData.id)
      NominationOrderFilesEntity.bulkCreate(fileData);

      return this.findById(nominationOrderData.id);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }


  async findById(id: number, userFormId?: number): Promise<NominationOrderDto> {
    try {
      const nominationOrder = await this.repository.findByPk<NominationOrderEntity>(
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
              ],
            },
            {
              model: User,
              as: 'userOrder',
              foreignKey: 'nomination_order_user_from_fkey',
              identifier: 'userFrom',
              include: [
                { model: State, as: 'state',},
              ],
            },
            { model: Nomination, as: 'nomination', },
            { model: NominationOrderFilesEntity, as: 'files', }
          ],
          order: [
            ['id', 'ASC'],
            [{model: NominationOrderFilesEntity, as: 'files'}, 'id', 'ASC'],
          ]
        }
      );

      let leftVotes;
      if (userFormId) {
				const userFrom = await this._usersService.getUserById(userFormId);
      	if (userFrom.role === Role.comittee || userFrom.role === Role.admin) {
					leftVotes = await this.userVotingService.leftVotesCommissionFinal(nominationOrder.nominationId, userFormId, id);
				}
      	if (userFrom.role === Role.comittee_main || userFrom.role === Role.admin) {
					leftVotes = await this.userVotingService.leftVotesCommissionFinal(nominationOrder.nominationId, userFormId, id,'final');
				}
				if (userFrom.role === Role.user) {
					leftVotes = await this.userVotingService.leftVotes(nominationOrder.nominationId, userFormId, id);
				}
			} else {
      	leftVotes = {votes: [], error: ''};
			}

      return new NominationOrderDto(nominationOrder, leftVotes.votes, leftVotes.error);
    } catch (e) {
      throw new BadRequestException(e)
    }
  }

  async changeFieldsById(
    id: number,
    updateNominationOrderDto: UpdateNominationOrderDto,
  ): Promise<NominationOrderDto> {
    try {
      const nominationOrderOld = await this.findById(id);
      if (!nominationOrderOld) {
        throw new HttpException('Nomination order not found.', HttpStatus.NOT_FOUND);
      }


      updateNominationOrderDto = {
        userId: updateNominationOrderDto.userId || nominationOrderOld.userId,
        userFrom: nominationOrderOld.userFrom,
        nominationId: updateNominationOrderDto.nominationId || nominationOrderOld.nominationId,
        textRu: updateNominationOrderDto.textRu || nominationOrderOld.textRu,
        textEn: updateNominationOrderDto.textEn || nominationOrderOld.textEn,
        public: updateNominationOrderDto.public !== null ? updateNominationOrderDto.public : nominationOrderOld.public,
        isSelected: updateNominationOrderDto.isSelected !== null ? updateNominationOrderDto.isSelected : nominationOrderOld.isSelected,
        isNew: nominationOrderOld.isNew,
        step2: updateNominationOrderDto.step2 !== null ? updateNominationOrderDto.step2 : nominationOrderOld.step2,
        step3: updateNominationOrderDto.step3 !== null ? updateNominationOrderDto.step3 : nominationOrderOld.step3,
      }

      await NominationOrderEntity.update(updateNominationOrderDto, { where: {id}});

      return this.findById(id);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async changeIsNew(
    id: number
  ): Promise<NominationOrderDto> {
    try {
      const nominationOrderOld = await this.findById(id);
      if (!nominationOrderOld) {
        throw new HttpException('Nomination order not found.', HttpStatus.NOT_FOUND);
      }

      const updateNominationOrderDto = {
        userId: nominationOrderOld.userId,
        userFrom: nominationOrderOld.userFrom,
        nominationId: nominationOrderOld.nominationId,
        textRu: nominationOrderOld.textRu,
        textEn: nominationOrderOld.textEn,
        public: nominationOrderOld.public,
        isSelected: nominationOrderOld.isSelected,
        isNew: true,
      }

      await NominationOrderEntity.update(updateNominationOrderDto, { where: {id}});

      return this.findById(id);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async findAllStep2(): Promise<{count: number, rows: NominationOrderDto[]}> {
    try {
      const { count, rows } = await this.repository.findAndCountAll<NominationOrderEntity>({
        where: { step2: true },
        include: [
          {
            model: User,
            as: 'user',
            identifier: 'userId',
            include: [
              { model: State, as: 'state',},
            ],
          },
          { model: Nomination, as: 'nomination', },
          { model: NominationOrderFilesEntity, as: 'files', }
        ],
        order: [
          ['id', 'DESC'],
          [{model: NominationOrderFilesEntity, as: 'files'}, 'id', 'ASC'],
        ]
      });

      return {
        count: rows.length,
        rows: rows.map(item => new NominationOrderDto(item)),
      }
    } catch (e) {
      throw new BadRequestException(e)
    }
  }

  async findAllStep3(): Promise<{count: number, rows: NominationOrderDto[]}> {
    try {
      const { count, rows } = await this.repository.findAndCountAll<NominationOrderEntity>({
        where: { step3: true },
        include: [
          {
            model: User,
            as: 'user',
            identifier: 'userId',
            include: [
              { model: State, as: 'state',},
            ],
          },
          { model: Nomination, as: 'nomination', },
          { model: NominationOrderFilesEntity, as: 'files', }
        ],
        order: [
          ['id', 'DESC'],
          [{model: NominationOrderFilesEntity, as: 'files'}, 'id', 'ASC'],
        ]
      });

      return {
        count: rows.length,
        rows: rows.map(item => new NominationOrderDto(item)),
      }
    } catch (e) {
      throw new BadRequestException(e)
    }
  }

}
