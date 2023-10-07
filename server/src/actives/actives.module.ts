import { Module } from '@nestjs/common';
import { ActivesService } from './actives.service';
import { ActivesController } from './actives.controller';
import { Active, ActiveSchema } from './schema/active.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Active.name,
        schema: ActiveSchema
      }
    ])
  ],
  controllers: [ActivesController],
  providers: [ActivesService]
})
export class ActivesModule {}
