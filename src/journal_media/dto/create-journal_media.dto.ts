import { IsBoolean, IsEnum, IsInt, IsOptional, IsString, IsUrl, IsUUID } from "class-validator";

export class CreateJournalMediaDto {
  @IsUUID()
  journalEntryId: string;

  @IsEnum(['image', 'audio', 'sticker'])
  mediaType: 'image' | 'audio' | 'sticker';

  @IsUrl()
  url: string;

  @IsOptional()
  @IsString()
  transcription?: string;

  @IsOptional()
  @IsBoolean()
  showAudio?: boolean;

  @IsOptional()
  @IsBoolean()
  showTranscription?: boolean;

  @IsOptional()
  @IsInt()
  positionInText?: number;
}
