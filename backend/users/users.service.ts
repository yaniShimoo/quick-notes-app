import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepo: Repository<User>,
  ) {}

  findById(id: string) {
    return this.usersRepo.findOne({ where: { id } });
  }

  findByEmail(email: string) {
    return this.usersRepo.findOne({ where: { email } });
  }

  //helper for creating a new user
  async create(email: string, passwordHash: string) {
    const user = this.usersRepo.create({ email, passwordHash });
    return this.usersRepo.save(user);
  }

  // helper for updating a user
  async update(id: string, data: Partial<Pick<User, 'email' | 'passwordHash'>>) {
    await this.usersRepo.update({ id }, data);
    return this.findById(id);
  }

  // helper for deleting a user
  async remove(id: string) {
    await this.usersRepo.delete({ id });
    return { deleted: true };
  }
}