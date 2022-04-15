import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { SdkClient, SdkClientMethod } from '../../../lib';
import { CatsService } from './cats.service';
import { Cat } from './classes/cat.class';
import { CreateCatDto } from './dto/create-cat.dto';
import { LettersEnum, PaginationQuery } from './dto/pagination-query.dto';

@SdkClient({ clientName: 'CatsClient' })
@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @SdkClientMethod({
    response: {
      type: Cat,
      isArray: false,
    },
    body: {
      type: CreateCatDto,
      isArray: false,
    },
  })
  @Post()
  async create(@Body() createCatDto: CreateCatDto): Promise<Cat> {
    return this.catsService.create(createCatDto);
  }

  @SdkClientMethod({
    response: {
      type: Cat,
      isArray: false,
    },
  })
  @Get(':id')
  findOne(@Param('id') id: string): Cat {
    return this.catsService.findOne(+id);
  }

  @SdkClientMethod()
  @Get()
  findAll(@Query() paginationQuery: PaginationQuery) {}

  @SdkClientMethod()
  @Get('explicit-query')
  findAllWithExplicitQuery(paginationQuery: PaginationQuery) {}

  @SdkClientMethod()
  @Get('bulk')
  findAllBulk(@Query() paginationQuery: PaginationQuery[]) {}

  @SdkClientMethod()
  @Post('bulk')
  async createBulk(@Body() createCatDto: CreateCatDto[]): Promise<Cat> {
    return null;
  }

  @SdkClientMethod()
  @Post('as-form-data')
  async createAsFormData(@Body() createCatDto: CreateCatDto): Promise<Cat> {
    return this.catsService.create(createCatDto);
  }

  @SdkClientMethod()
  @Get('site*')
  getSite() {}

  @SdkClientMethod()
  @Get('with-enum/:type')
  getWithEnumParam(@Param('type') type: LettersEnum) {}

  @SdkClientMethod({
    sdkMethodName: 'findRandom',
    response: {
      type: 'void',
    },
  })
  @Get('with-random-query')
  getWithRandomQuery(@Query('type') type: string) {}
}
