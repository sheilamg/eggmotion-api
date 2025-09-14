import { AuditableEntity } from "src/common/entities/auditable.entity";
import { Journal } from "src/journal/entities/journal.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class JournalMedia extends AuditableEntity{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  url: string;

  @Column()
  mediaType: 'image' | 'audio' | 'sticker';

  @Column({ nullable: true })
  transcription?: string;

  @Column({ default: true })
  showAudio: boolean;

  @Column({ default: true })
  showTranscription: boolean;

  @Column({ nullable: true })
  positionInText?: number; // Solo para stickers o imágenes embebidas

  @ManyToOne(() => Journal, journal => journal.media, { onDelete: 'CASCADE' })
  journal: Journal;
}
