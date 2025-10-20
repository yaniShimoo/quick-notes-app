import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import dataSource from '../ormconfig';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { NotesModule } from '../notes/notes.module';


@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: async () => ({ ...dataSource.options }),
        }),
        AuthModule,
        UsersModule,
        NotesModule,
    ],
})
export class AppModule {}