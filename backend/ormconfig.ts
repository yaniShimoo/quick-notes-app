import { DataSource } from 'typeorm';
import { User } from './users/user.entity';
import { Note } from './notes/note.entity';


export default new DataSource({
    type: 'postgres',
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT || '5432', 10),
    username: process.env.DATABASE_USER || 'notes_user',
    password: process.env.DATABASE_PASSWORD || 'notes_pass',
    database: process.env.DATABASE_NAME || 'notes',
    entities: [User, Note],
    synchronize: true,
});