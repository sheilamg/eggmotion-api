import { AuditableEntity } from 'src/common/entities/auditable.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  OneToMany,
} from 'typeorm';
import { UserRole } from '../enums/user-role.enum';
import { EmotionByUser } from 'src/emotions-by-user/entities/emotion_by_user.entity';
import { Journal } from 'src/journal/entities/journal.entity';

@Entity('users')
@Unique(['email'])
export class User extends AuditableEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @OneToMany(() => EmotionByUser, (ebu) => ebu.user)
  emotions: EmotionByUser[];

  @OneToMany(() => Journal, (jor) => jor.user)
  journal: Journal[];
}
