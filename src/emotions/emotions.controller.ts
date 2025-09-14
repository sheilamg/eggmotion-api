import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { EmotionsService } from './emotions.service';
import { Emotion } from './entities/emotion.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('emotions')
@UseGuards(JwtAuthGuard)
export class EmotionsController {
  constructor(private readonly emotionsService: EmotionsService) {}

  @Post()
  create(@Body() emotion: Emotion) {
    return this.emotionsService.create(emotion);
  }

  @Get()
  findAll() {
    return this.emotionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.emotionsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() emotion: Partial<Emotion>) {
    return this.emotionsService.update(id, emotion);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.emotionsService.remove(id);
  }
}
