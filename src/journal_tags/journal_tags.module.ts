import { Module } from '@nestjs/common';
import { JournalTagsService } from './journal_tags.service';
import { JournalTagsController } from './journal_tags.controller';

@Module({
  controllers: [JournalTagsController],
  providers: [JournalTagsService],
})
export class JournalTagsModule {}
