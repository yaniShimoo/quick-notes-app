import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Note } from '../notes/note.entity';


@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ unique: true })
    email!: string;

    @Column()
    passwordHash!: string;

    @OneToMany(() => Note, (note) => note.user)
    notes!: Note[];
}