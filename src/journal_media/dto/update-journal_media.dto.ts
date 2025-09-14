import { PartialType } from '@nestjs/mapped-types';
import { CreateJournalMediaDto } from './create-journal_media.dto';

export class UpdateJournalMediaDto extends PartialType(CreateJournalMediaDto) {}
