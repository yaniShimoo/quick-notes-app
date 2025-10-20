import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private usersRepo: Repository<User>,
        private jwt: JwtService,
    ) {}


    async register(email: string, password: string) {
        const existing = await this.usersRepo.findOne({ where: { email } });
        
        if (existing) 
            throw new ConflictException('Email already registered');
        
        const passwordHash = await bcrypt.hash(password, 12);
        const user = this.usersRepo.create({ email, passwordHash });
        
        await this.usersRepo.save(user);
        
        return this.signToken(user);
    }


    async login(email: string, password: string) {
        const user = await this.usersRepo.findOne({ where: { email } });

        if (!user)
            throw new UnauthorizedException('Invalid credentials');
    
        const ok = await bcrypt.compare(password, user.passwordHash);

        if (!ok)
            throw new UnauthorizedException('Invalid credentials');
    
        return this.signToken(user);
    }


    private async signToken(user: User) {
        const payload = { sub: user.id, email: user.email };
        const accessToken = await this.jwt.signAsync(payload);
        return { accessToken };
    }
}