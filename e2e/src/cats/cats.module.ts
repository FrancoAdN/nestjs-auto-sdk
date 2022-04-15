import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { DogsController } from './dogs.controller';

@Module({
  controllers: [CatsController, DogsController],
  providers: [CatsService],
})
export class CatsModule {}
