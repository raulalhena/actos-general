import { Module } from '@nestjs/common';
import { ModesService } from './modes.service';
import { ModesController } from './modes.controller';

@Module({
  controllers: [ModesController],
  providers: [ModesService]
})
export class ModesModule {}
