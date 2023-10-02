import { Module } from '@nestjs/common';
import { MiscService } from './misc.service';
import { MiscController } from './misc.controller';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { CategorySchema, Category } from './schemas/category.schema';
import { Subcategory, SubcategorySchema } from './schemas/subcategory.schema';
import { Type, TypeSchema } from './schemas/type.schema';
import { Language, LanguageSchema } from './schemas/language.schema';
import { Time, TimeSchema } from './schemas/time.schema';
import { TimeZone, TimeZoneSchema } from './schemas/timezone.schema';
import { Visibility, VisibilitySchema } from './schemas/visibility.schema';
import { Capacity, CapacitySchema } from './schemas/capacity.schema';
import { Mode, ModeSchema } from './schemas/mode.schema';


@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Category.name,
        schema: CategorySchema
      },
      {
        name: Subcategory.name,
        schema: SubcategorySchema
      },
      {
        name: Type.name,
        schema: TypeSchema
      },
      {
        name: Language.name,
        schema: LanguageSchema
      },
      {
        name: Time.name,
        schema: TimeSchema
      },
      {
        name: TimeZone.name,
        schema: TimeZoneSchema
      },
      {
        name: Visibility.name,
        schema: VisibilitySchema
      },
      {
        name: Capacity.name,
        schema: CapacitySchema
      },
      {
        name: Mode.name,
        schema: ModeSchema
      },

    ])
  ],
  controllers: [MiscController],
  providers: [MiscService]
})
export class MiscModule {}
