import { Injectable } from '@nestjs/common';
import { CreateJournalTagDto } from './dto/create-journal_tag.dto';
import { UpdateJournalTagDto } from './dto/update-journal_tag.dto';

@Injectable()
export class JournalTagsService {
  create(createJournalTagDto: CreateJournalTagDto) {
    return 'This action adds a new journalTag';
  }

  findAll() {
    return `This action returns all journalTags`;
  }

  findOne(id: number) {
    return `This action returns a #${id} journalTag`;
  }

  update(id: number, updateJournalTagDto: UpdateJournalTagDto) {
    return `This action updates a #${id} journalTag`;
  }

  remove(id: number) {
    return `This action removes a #${id} journalTag`;
  }
}
