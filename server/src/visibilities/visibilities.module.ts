import { Module } from '@nestjs/common';
import { VisibilitiesService } from './visibilities.service';
import { VisibilitiesController } from './visibilities.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Visibility, VisibilitySchema } from './schema/visibility.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Visibility.name,
        schema: VisibilitySchema
      }
    ])
  ],
  controllers: [VisibilitiesController],
  providers: [VisibilitiesService]
})
export class VisibilitiesModule {}
