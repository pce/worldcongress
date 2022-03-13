import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { DocsService } from './docs.service';
import { CreateDocDto } from './dto/create-doc.dto';

@Controller('docs')
export class DocsController {

    constructor(private readonly docsService:DocsService) {}

    @Post()
    async create(@Body() createDocDto:CreateDocDto) {
        return this.docsService.create(createDocDto)
    }
  
    @Get(':title')
    async findByTitle(@Param('title') title: string) {
      return this.docsService.findOne({title});
    }

    @Get()
    async all() {
      return this.docsService.findAll();
    }

}
