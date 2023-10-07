import { Module } from '@nestjs/common';
import { ModesService } from './modes.service';
import { ModesController } from './modes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Mode, ModeSchema } from './schema/mode.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Mode.name,
        schema: ModeSchema
      }
    ])
  ],
  controllers: [ModesController],
  providers: [ModesService]
})
export class ModesModule {}
