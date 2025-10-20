import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Index } from 'typeorm';
import { User } from '../users/user.entity';


@Entity()
export class Note {
    @PrimaryGeneratedColumn('uuid')
    id!: string;


    @Column()
    @Index({ fulltext: true })
    title!: string;


    @Column({ type: 'text' })
    content!: string;


    @ManyToOne(() => User, (user) => user.notes, { onDelete: 'CASCADE' })
    user!: User;
}