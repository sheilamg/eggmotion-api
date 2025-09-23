import { AuditableEntity } from 'src/common/entities/auditable.entity';
import { EmotionByUser } from 'src/emotions-by-user/entities/emotion_by_user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Emotion extends AuditableEntity{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  emotion: string;

  @Column()
  emoji: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ nullable: true })
  origin: string;

  @Column({ nullable: true })
  classification: string;

  @Column({ type: 'int', nullable: true })
  intensity: number;

  @Column({ type: 'json', nullable: true })
  tags: string[];

  @Column({ type: 'json', nullable: true })
  related_emotions: string[];

  @Column({ type: 'text', nullable: true })
  context: string;

  @Column({ type: 'json', nullable: true })
  triggers: string[];

  @Column({ type: 'json', nullable: true })
  keywords: string[];

  @OneToMany(() => EmotionByUser, (ebu) => ebu.emotion)
  usages: EmotionByUser[];
} 