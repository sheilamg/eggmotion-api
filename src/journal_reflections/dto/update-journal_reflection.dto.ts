import { PartialType } from '@nestjs/mapped-types';
import { CreateJournalReflectionDto } from './create-journal_reflection.dto';

export class UpdateJournalReflectionDto extends PartialType(CreateJournalReflectionDto) {}
