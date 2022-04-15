import { LettersEnum } from '../dto/pagination-query.dto';
import { SdkProperty } from '../../../../lib';
export class Cat {
  @SdkProperty({ type: 'string', required: true })
  name: string;

  @SdkProperty({ type: 'number', required: true })
  age: number;

  @SdkProperty({ type: 'string', required: true })
  breed: string;

  @SdkProperty({ type: 'string[]', required: true })
  tags?: string[];

  @SdkProperty({ type: 'Date', required: true })
  createdAt: Date;

  @SdkProperty({ type: 'string[]', required: false })
  urls?: string[];

  @SdkProperty({ type: 'string', required: true })
  enum: LettersEnum;

  @SdkProperty({ type: 'string', required: true })
  enumArr: LettersEnum;
}
