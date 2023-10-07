import { Module } from '@nestjs/common';
import { MiscService } from './misc.service';
import { MiscController } from './misc.controller';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { CategorySchema, Category } from '../categories/schema/category.schema';
import { Subcategory, SubcategorySchema } from '../categories/schema/subcategory.schema';
import { Type, TypeSchema } from '../types/schemas/type.schema';
import { Active, ActiveSchema } from '../actives/schema/active.schema';
import { Language, LanguageSchema } from '../languages/schema/language.schema';
import { Time, TimeSchema } from '../times/schema/time.schema';
import { TimeZone, TimeZoneSchema } from '../timezones/schema/timezone.schema';
import { Visibility, VisibilitySchema } from '../visibilities/schema/visibility.schema';
import { Capacity, CapacitySchema } from '../capacities/schema/capacity.schema';
import { Mode, ModeSchema } from '../modes/schema/mode.schema';


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
        name: Active.name,
        schema: ActiveSchema
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
