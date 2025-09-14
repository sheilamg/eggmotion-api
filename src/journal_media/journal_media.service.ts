import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateJournalMediaDto } from './dto/create-journal_media.dto';
import { UpdateJournalMediaDto } from './dto/update-journal_media.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { JournalMedia } from './entities/journal_media.entity';
import { Repository } from 'typeorm';
import { Journal } from 'src/journal/entities/journal.entity';

@Injectable()
export class JournalMediaService {
  constructor(
    @InjectRepository(JournalMedia)
    private mediaRepo: Repository<JournalMedia>,
    @InjectRepository(Journal)
    private journalRepo: Repository<Journal>,
  ) {}

  async create(dto: CreateJournalMediaDto): Promise<JournalMedia> {
    const journal = await this.journalRepo.findOneBy({ id: dto.journalEntryId });
    if (!journal) throw new NotFoundException('Journal entry not found');

    const media = this.mediaRepo.create({
      ...dto,
      journal: journal,
    });
    return this.mediaRepo.save(media);
  }

  async update(id: string, dto: UpdateJournalMediaDto): Promise<JournalMedia> {
    const media = await this.mediaRepo.findOneBy({ id });
    if (!media) throw new NotFoundException('Media not found');

    Object.assign(media, dto);
    return this.mediaRepo.save(media);
  }

  async delete(id: string): Promise<void> {
    const result = await this.mediaRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException('Media not found');
  }

  async findByJournalEntry(journalEntryId: string): Promise<JournalMedia[]> {
    return this.mediaRepo.find({
      where: { journal: { id: journalEntryId } },
      order: { mediaType: 'ASC' },
    });
  }
}
