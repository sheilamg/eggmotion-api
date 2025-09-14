import { PartialType } from '@nestjs/mapped-types';
import { CreateJournalTagDto } from './create-journal_tag.dto';

export class UpdateJournalTagDto extends PartialType(CreateJournalTagDto) {}
