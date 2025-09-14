import { Module } from '@nestjs/common';
import { JournalMediaService } from './journal_media.service';
import { JournalMediaController } from './journal_media.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Journal } from 'src/journal/entities/journal.entity';
import { JournalMedia } from './entities/journal_media.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Journal, JournalMedia])],
  controllers: [JournalMediaController],
  providers: [JournalMediaService],
  exports: [JournalMediaService]
})
export class JournalMediaModule {}
