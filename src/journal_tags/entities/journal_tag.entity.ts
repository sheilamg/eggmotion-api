import { AuditableEntity } from "src/common/entities/auditable.entity";
import { Journal } from "src/journal/entities/journal.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

//para etiquetar una entrada como: ["ansiedad", "trabajo", "autoestima"]
@Entity()
export class JournalTag extends AuditableEntity{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToMany(() => Journal, journal => journal.tags)
  journal: Journal[];
}
