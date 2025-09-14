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

  @OneToMany(() => EmotionByUser, (ebu) => ebu.emotion)
  usages: EmotionByUser[];
} 