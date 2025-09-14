import { Module } from '@nestjs/common';
import { JournalReflectionsService } from './journal_reflections.service';
import { JournalReflectionsController } from './journal_reflections.controller';

@Module({
  controllers: [JournalReflectionsController],
  providers: [JournalReflectionsService],
})
export class JournalReflectionsModule {}
