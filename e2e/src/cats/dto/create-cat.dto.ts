import { SdkProperty } from '../../../../lib';
import { LettersEnum } from './pagination-query.dto';
import { TagDto } from './tag.dto';

export class CreateCatDto {
  @SdkProperty()
  readonly name: string;

  @SdkProperty()
  readonly age: number;

  @SdkProperty()
  readonly breed: string;

  @SdkProperty({ required: false, type: String.name })
  readonly tags?: string[];

  @SdkProperty()
  createdAt: Date;

  @SdkProperty({ required: false, type: String.name })
  readonly urls?: string[];

  @SdkProperty()
  readonly enum: LettersEnum;

  @SdkProperty()
  readonly enumArr: LettersEnum;

  @SdkProperty()
  readonly tag: TagDto;

  // nested: {
  //   first: string;
  //   second: number;
  // };
}
