import { Injectable, NotFoundException } from '@nestjs/common';
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

  async deleteLanguage(id: string): Promise<void> {
    const result = await this.languageModel.deleteOne({ _id: id })
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Language with ID ${id} not found`);
    }
  }

}
