import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { NotesService } from './notes.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';


@Controller('notes')
@UseGuards(JwtAuthGuard)
export class NotesController {
    constructor(private notes: NotesService) {}


    @Post()
    create(@Req() req: any, @Body() body: { title: string; content: string }) {
        return this.notes.create(req.user.userId, body.title, body.content);
    }


    @Get()
    list(@Req() req: any, @Query('q') q?: string) {
        return this.notes.list(req.user.userId, q);
    }


    @Patch(':id')
    update(@Req() req: any, @Param('id') id: string, @Body() body: any) {
        return this.notes.update(req.user.userId, id, body);
    }


    @Delete(':id')
    remove(@Req() req: any, @Param('id') id: string) {
        return this.notes.remove(req.user.userId, id);
    }
}