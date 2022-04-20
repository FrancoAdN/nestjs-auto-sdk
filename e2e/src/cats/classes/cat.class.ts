import { LettersEnum } from '../dto/pagination-query.dto';
import { SdkProperty } from '../../../../lib';
export class Cat {
  @SdkProperty({ required: true })
  name: string;

  @SdkProperty({ required: true })
  age: number;

  @SdkProperty({ required: true })
  breed: string;

  @SdkProperty({ required: true, type: String.name })
  tags?: string[];

  @SdkProperty({ required: true })
  createdAt: Date;

  @SdkProperty({ required: false, type: String.name })
  urls?: string[];

  @SdkProperty({ required: true })
  enum: LettersEnum;

  @SdkProperty({ required: true, type: String.name, enum: LettersEnum })
  enumArr: LettersEnum[];
}
