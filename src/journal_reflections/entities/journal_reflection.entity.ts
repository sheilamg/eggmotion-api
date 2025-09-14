import { AuditableEntity } from "src/common/entities/auditable.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class JournalReflection extends AuditableEntity{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: 'weekly' | 'monthly';

  @Column({ type: 'date' })
  periodStart: Date;

  @Column({ type: 'date' })
  periodEnd: Date;

  @Column('text')
  content: string;

  @ManyToOne(() => User)
  user: User;

  //pensar en manera de identificar la semana/mes.. ?
}
