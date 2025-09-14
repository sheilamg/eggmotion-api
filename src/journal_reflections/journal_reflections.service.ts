import { Injectable } from '@nestjs/common';
import { CreateJournalReflectionDto } from './dto/create-journal_reflection.dto';
import { UpdateJournalReflectionDto } from './dto/update-journal_reflection.dto';

@Injectable()
export class JournalReflectionsService {
  create(createJournalReflectionDto: CreateJournalReflectionDto) {
    return 'This action adds a new journalReflection';
  }

  findAll() {
    return `This action returns all journalReflections`;
  }

  findOne(id: number) {
    return `This action returns a #${id} journalReflection`;
  }

  update(id: number, updateJournalReflectionDto: UpdateJournalReflectionDto) {
    return `This action updates a #${id} journalReflection`;
  }

  remove(id: number) {
    return `This action removes a #${id} journalReflection`;
  }
}
