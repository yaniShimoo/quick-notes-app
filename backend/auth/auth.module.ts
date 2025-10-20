import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from '../users/user.entity';
import { JwtStrategy } from '../common/strategies/jwt.strategy';


@Module({
    imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.register({
        global: true,
        secret: process.env.JWT_SECRET || 'supersecret',
        signOptions: { expiresIn: '7d' },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
})
export class AuthModule {}