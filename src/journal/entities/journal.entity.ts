import { AuditableEntity } from "src/common/entities/auditable.entity";
import { EmotionByUser } from "src/emotions-by-user/entities/emotion_by_user.entity";
import { JournalMedia } from "src/journal_media/entities/journal_media.entity";
import { JournalTag } from "src/journal_tags/entities/journal_tag.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Journal extends AuditableEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('json')
    content: JSON;

    @Column({ type: 'timestamptz' })
    createdAt: Date;

    @ManyToOne(() => User, user => user.journal, { onDelete: 'CASCADE' })
    user: User;

    @ManyToOne(() => EmotionByUser, emotion => emotion.journal, { nullable: true, onDelete: 'SET NULL' })
    emotion: EmotionByUser;

    @ManyToMany(() => JournalTag, tag => tag.journal, { cascade: true })
    @JoinTable()
    tags: JournalTag[];

    @ManyToOne(() => JournalMedia)
    media: JournalMedia;

    //la entrada asociada a la fecha/hora es privada o publica
    @Column({ default: true })
    isPrivate: boolean;
}
