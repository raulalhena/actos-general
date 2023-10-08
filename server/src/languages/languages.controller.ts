import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LanguagesService } from './languages.service';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';

@Controller('languages')
export class LanguagesController {
  constructor(private readonly languagesService: LanguagesService) {}

  @Post()
  createLanguage(@Body() createLanguageDto: CreateLanguageDto) {
    return this.languagesService.createLanguage(createLanguageDto);
  }

  @Post('load')
  bulkCreateLanguages(@Body() createLanguageDto: CreateLanguageDto[]) {
    return this.languagesService.bulkCreateLanguages(createLanguageDto);
  }

  @Get()
  findAllLanguages() {
    return this.languagesService.findAllLanguages();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.languagesService.deleteLanguage(id);
  }
}
