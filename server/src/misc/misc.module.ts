import { Module } from '@nestjs/common';
import { MiscService } from './misc.service';
import { MiscController } from './misc.controller';

@Module({
  controllers: [MiscController],
  providers: [MiscService]
})
export class MiscModule {}
