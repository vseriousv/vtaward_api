import { ApiProperty } from '@nestjs/swagger';
import { ContentMain } from '../contentMain.entity';

export class ContentMainDto {
  @ApiProperty()
  readonly name_ru: string;

  @ApiProperty()
  readonly name_en: string;

  @ApiProperty()
  readonly position_ru: string;

  @ApiProperty()
  readonly position_en: string;

  @ApiProperty()
  readonly text_ru: string;

  @ApiProperty()
  readonly text_en: string;

  @ApiProperty()
  readonly image: string;

  // constructor(contentMain: ContentMain) {
  //   console.log(contentMain.name_ru);
  //   this.name_ru = contentMain.name_ru;
  //   this.name_en = contentMain.name_en;
  //   this.position_ru = contentMain.position_ru;
  //   this.position_en = contentMain.position_en;
  //   this.text_ru = contentMain.text_ru;
  //   this.text_en = contentMain.text_en;
  //   this.image = contentMain.image;
  // }
}
