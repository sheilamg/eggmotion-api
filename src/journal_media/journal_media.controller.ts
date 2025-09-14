import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { JournalMediaService } from './journal_media.service';
import { CreateJournalMediaDto } from './dto/create-journal_media.dto';
import { UpdateJournalMediaDto } from './dto/update-journal_media.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('journal-media')
@UseGuards(JwtAuthGuard)
export class JournalMediaController {
  constructor(private readonly journalMediaService: JournalMediaService) {}

  @Post()
  create(@Body() dto: CreateJournalMediaDto) {
    return this.journalMediaService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateJournalMediaDto) {
    return this.journalMediaService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.journalMediaService.delete(id);
  }

  @Get('journal/:journalEntryId')
  findByJournalEntry(@Param('journalEntryId') journalEntryId: string) {
    return this.journalMediaService.findByJournalEntry(journalEntryId);
  }
}
