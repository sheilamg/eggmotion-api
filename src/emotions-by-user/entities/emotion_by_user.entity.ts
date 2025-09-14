import { AuditableEntity } from 'src/common/entities/auditable.entity';
import { Emotion } from 'src/emotions/entities/emotion.entity';
import { Journal } from 'src/journal/entities/journal.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';

@Entity('emotions_by_user')
export class EmotionByUser extends AuditableEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Emotion, (emotion) => emotion.usages, { eager: true })
  @JoinColumn({ name: 'emotion_id' })
  emotion: Emotion;

  @ManyToOne(() => User, (user) => user.emotions, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'int' })
  //intensidad con la que sintió esa emoción en ese día.. (del 1 al 10)
  intensity: number;

  // Nota obligatoria sobre por qué eligió esa emoción
  @Column({ type: 'text' })
  note: string;

  //se agrega una nota como obligatorio (para que diga como min una oración, y se agrega el journal como sugerencia si se quiere seguir expresando)
  @OneToMany(() => Journal, journal => journal.emotion)
  journal?: Journal;

  // Fecha y hora de creación (se completa automáticamente)
  //!!! en realidad debería venir el valor del front.. porque el usaurio puede seleccionarlo tmb jeje 
  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  creationDate: Date;
} 