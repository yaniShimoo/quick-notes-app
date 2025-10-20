import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Note } from './note.entity';


@Injectable()
export class NotesService {
    constructor(@InjectRepository(Note) private repo: Repository<Note>) {}


    async create(userId: string, title: string, content: string) {
        const note = this.repo.create({ title, content, user: { id: userId } as any });
        return this.repo.save(note);
    }


    async list(userId: string, q?: string) {
        const where: any = { user: { id: userId } };
        if (q) 
            where.title = Like(`%${q}%`);
        
        return this.repo.find({ where, order: { id: 'DESC' } });
    }


    async update(userId: string, id: string, data: Partial<Note>) {
        const note = await this.repo.findOne({ where: { id, user: { id: userId } } });
        
        if (!note) return null;
        
        Object.assign(note, data);
        
        return this.repo.save(note);
    }   


    async remove(userId: string, id: string) {
        const note = await this.repo.findOne({ where: { id, user: { id: userId } } });
        
        if (!note) return null;
        
        await this.repo.remove(note);
        return { deleted: true };
    }
}