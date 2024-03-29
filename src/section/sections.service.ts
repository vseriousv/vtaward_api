import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Section } from './section.entity';
import { SectionDto } from './dto/section.dto';
import { CreateSectionDto } from './dto/creat-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';

@Injectable()
export class SectionsService {
  constructor(
    @Inject('SectionRepository')
    private readonly sectionRepository: typeof Section,
  ) {}

  async findAll() {
    const sections = await this.sectionRepository.findAll<Section>({
      order: [['id', 'ASC']],
    });
    return sections.map(section => new SectionDto(section));
  }

  async getSection(id: number) {
    const section = await this.sectionRepository.findOne<Section>({
      where: { id },
    });
    if (!section) {
      throw new HttpException(
        'Section with given code not found',
        HttpStatus.NOT_FOUND,
      );
    }
    return new SectionDto(section);
  }

  async create(createSectionDto: CreateSectionDto) {
    try {
      const section = new Section();

      section.value_ru = createSectionDto.value_ru;
      section.value_en = createSectionDto.value_en;

      const sectionsData = await section.save();

      // return new UserLoginResponseDto(userData, token);
      return new SectionDto(sectionsData);
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: string, updateSectionDto: UpdateSectionDto) {
    const section = await this.sectionRepository.findByPk<Section>(id);
    if (!section) {
      throw new HttpException('Section not found.', HttpStatus.NOT_FOUND);
    }
    section.value_ru = updateSectionDto.value_ru || section.value_ru;
    section.value_en = updateSectionDto.value_en || section.value_en;

    try {
      const data = await section.save();
      return new SectionDto(data);
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(id: string) {
    const section = await this.sectionRepository.findByPk<Section>(id);
    await section.destroy();
    return new SectionDto(section);
  }
}
