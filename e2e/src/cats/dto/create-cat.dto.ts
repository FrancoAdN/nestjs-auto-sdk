import { SdkProperty } from '../../../../lib';
import { LettersEnum } from './pagination-query.dto';
import { TagDto } from './tag.dto';

export class CreateCatDto {
  @SdkProperty({ type: 'string', required: true })
  readonly name: string;

  @SdkProperty({ type: 'number', required: true })
  readonly age: number;

  @SdkProperty({ type: 'string', required: true })
  readonly breed: string;

  @SdkProperty({ type: 'string[]', required: true })
  readonly tags?: string[];

  @SdkProperty({ type: 'Date', required: true })
  createdAt: Date;

  @SdkProperty({ type: 'string[]', required: true })
  readonly urls?: string[];

  @SdkProperty({ type: 'string', required: true })
  readonly enum: LettersEnum;

  @SdkProperty({ type: 'string', required: true })
  readonly enumArr: LettersEnum;

  @SdkProperty({ type: 'TagDto', required: true })
  readonly tag: TagDto;

  // nested: {
  //   first: string;
  //   second: number;
  // };
}
