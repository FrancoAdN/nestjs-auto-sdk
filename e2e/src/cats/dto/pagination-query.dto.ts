export enum LettersEnum {
  A = 'A',
  B = 'B',
  C = 'C',
}

export class PaginationQuery {
  page: number;

  sortBy: string[];

  limit: number;

  enum: LettersEnum;

  enumArr: LettersEnum;

  beforeDate: Date;

  filter: Record<string, any>;

  static _OPENAPI_METADATA_FACTORY() {
    return {
      sortBy: { type: () => [String] },
    };
  }
}
