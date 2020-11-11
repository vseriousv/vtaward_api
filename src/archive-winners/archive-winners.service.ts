import { Inject, Injectable, HttpException, HttpStatus, BadRequestException,} from '@nestjs/common';
import { ArchiveWinnersEntity } from './archive-winners.entity';
import { CreateArchiveWinnersDto } from './dto/create-archive-winners.dto';
import { ArchiveWinnersDto } from './dto/archive-winners.dto';
import { UpdateArchiveWinnersDto } from './dto/update-archive-winners.dto';

@Injectable()
export class ArchiveWinnersService {
    constructor(
        @Inject('ArchiveWinnersRepository')
        private readonly repository: typeof ArchiveWinnersEntity,
    )
    {}

    async create(data: CreateArchiveWinnersDto) {
        try {
            const object = new ArchiveWinnersEntity();
            object.img = data.img;
            object.name = data.name;
            object.year = data.year;
            object.position = data.position;
            object.city = data.city; 

            const result = await object.save();
            console.log(result);

        } catch(e) {
            throw new BadRequestException(e)
        }

    } 

    async findAll() {
        try {
            const resp = await this.repository.findAndCountAll<ArchiveWinnersEntity>()
            return {
                count: resp.rows.length,
                rows: resp.rows.map(item => new ArchiveWinnersDto(item)),
            }
        } catch(e) {
            throw new BadRequestException(e)
        }
    }

    async findById(id: number):Promise<ArchiveWinnersDto> {
        try{
            return this.repository.findByPk<ArchiveWinnersEntity>(id);
        } catch(e) {
            throw new BadRequestException(e)
        }
    }

    async update(id: number, data: UpdateArchiveWinnersDto) {
        try {
            const object = await this.repository.findByPk<ArchiveWinnersEntity>(id);
            if(!object) {
                throw new HttpException('Nomination not found.', HttpStatus.NOT_FOUND);
            }
            object.img = data.img || object.img;
            object.name = data.name || object.name;
            object.year = data.year || object.year;
            object.position = data.position || object.position;
            object.city = data.city || object.city; 

            const result = await object.save();
            return new ArchiveWinnersDto(result);
        } catch(err) {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        } 
    }

    async changeOneFiled(id: number, data: UpdateArchiveWinnersDto): Promise<ArchiveWinnersDto> {
        try {
            const object = await this.repository.findByPk<ArchiveWinnersEntity>(id);
            if(!object) {
                throw new HttpException('Nomination not found.', HttpStatus.NOT_FOUND);
            }
            object.img = data.img || object.img;
            object.name = data.name || object.name;
            object.year = data.year || object.year;
            object.position = data.position || object.position;
            object.city = data.city || object.city;  

            const result = await object.save();
            return this.findById(object.id);
        } catch(err) {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        } 
    }

    async delete(id: number) {
        try {
            const object = await this.repository.findByPk<ArchiveWinnersEntity>(id);
            await object.destroy();
            return new ArchiveWinnersDto(object);
        } catch(e) {
            throw new BadRequestException(e)
        } 
    }
}
