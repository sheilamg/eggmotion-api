import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { JournalTagsService } from './journal_tags.service';
import { CreateJournalTagDto } from './dto/create-journal_tag.dto';
import { UpdateJournalTagDto } from './dto/update-journal_tag.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('journal-tags')
@UseGuards(JwtAuthGuard)
export class JournalTagsController {
  constructor(private readonly journalTagsService: JournalTagsService) {}

  @Post()
  create(@Body() createJournalTagDto: CreateJournalTagDto) {
    return this.journalTagsService.create(createJournalTagDto);
  }

  @Get()
  findAll() {
    return this.journalTagsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.journalTagsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJournalTagDto: UpdateJournalTagDto) {
    return this.journalTagsService.update(+id, updateJournalTagDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.journalTagsService.remove(+id);
  }
}
