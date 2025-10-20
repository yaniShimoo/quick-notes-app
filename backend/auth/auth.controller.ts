import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';


class AuthDto { 
    email!: string;
    password!: string;
}


@Controller('auth')
export class AuthController {
    constructor(private auth: AuthService) {}


    @Post('register')
    register(@Body() dto: AuthDto) {
        return this.auth.register(dto.email, dto.password);
    }


    @Post('login')
    login(@Body() dto: AuthDto) {
        return this.auth.login(dto.email, dto.password);
    }
}