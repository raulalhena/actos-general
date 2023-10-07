import { Module } from '@nestjs/common';
import { CapacitiesService } from './capacities.service';
import { CapacitiesController } from './capacities.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Capacity, CapacitySchema } from './schema/capacity.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Capacity.name,
        schema: CapacitySchema
      }
    ])
  ],
  controllers: [CapacitiesController],
  providers: [CapacitiesService]
})
export class CapacitiesModule {}
