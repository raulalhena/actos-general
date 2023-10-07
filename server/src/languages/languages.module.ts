import { Module } from '@nestjs/common';
import { LanguagesService } from './languages.service';
import { LanguagesController } from './languages.controller';
import { Language, LanguageSchema } from './schema/language.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Language.name,
        schema: LanguageSchema},
       
      ])],
  controllers: [LanguagesController],
  providers: [LanguagesService]
})
export class LanguagesModule {}
