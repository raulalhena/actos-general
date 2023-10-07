import { Injectable } from '@nestjs/common';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Language } from './schema/language.schema';

@Injectable()
export class LanguagesService {
  constructor(@InjectModel(Language.name) private languageModel: Model<Language>) {
  }
  createLanguage(createLanguageDto: CreateLanguageDto) {
    return this.languageModel.create(createLanguageDto);
  }

  bulkCreateLanguages(createLanguageDto: CreateLanguageDto[]) {
    return this.languageModel.create(createLanguageDto);
  }

  findAllLanguages() {
    return this.languageModel.find();
  }

}
