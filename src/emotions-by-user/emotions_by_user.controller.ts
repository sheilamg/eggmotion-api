import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { EmotionsByUserService } from './emotions_by_user.service';
import { CreateEmotionsByUserDto } from './dto/create-emotions-by-user.dto';
import { UpdateEmotionsByUserDto } from './dto/update-emotions-by-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('emotions-by-user')
@UseGuards(JwtAuthGuard)
export class EmotionsByUserController {
  constructor(private readonly emotionsByUserService: EmotionsByUserService) {}

  @Post()
  create(@Body() emotion: CreateEmotionsByUserDto, @Request() req) {
    return this.emotionsByUserService.create(emotion, req.user);
  }

  @Get()
  findAll(@Request() req) {
    return this.emotionsByUserService.findAll(req.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    return this.emotionsByUserService.findOne(id, req.user);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() emotion: UpdateEmotionsByUserDto, @Request() req) {
    return this.emotionsByUserService.update(id, emotion, req.user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.emotionsByUserService.remove(id, req.user);
  }

  @Get('user/:userId')
  findByUser(@Param('userId') userId: string) {
    return this.emotionsByUserService.findByUser(userId);
  }
}
