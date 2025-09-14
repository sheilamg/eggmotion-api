import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { JournalReflectionsService } from './journal_reflections.service';
import { CreateJournalReflectionDto } from './dto/create-journal_reflection.dto';
import { UpdateJournalReflectionDto } from './dto/update-journal_reflection.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('journal-reflections')
@UseGuards(JwtAuthGuard)
export class JournalReflectionsController {
  constructor(private readonly journalReflectionsService: JournalReflectionsService) {}

  @Post()
  create(@Body() createJournalReflectionDto: CreateJournalReflectionDto) {
    return this.journalReflectionsService.create(createJournalReflectionDto);
  }

  @Get()
  findAll() {
    return this.journalReflectionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.journalReflectionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJournalReflectionDto: UpdateJournalReflectionDto) {
    return this.journalReflectionsService.update(+id, updateJournalReflectionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.journalReflectionsService.remove(+id);
  }
}
