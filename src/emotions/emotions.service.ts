import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Emotion } from './entities/emotion.entity';
import { error } from 'console';

@Injectable()
export class EmotionsService {
  constructor(
    @InjectRepository(Emotion)
    private emotionsRepository: Repository<Emotion>,
  ) {}

  create(emotion: Partial<Emotion>): Promise<Emotion> {
    const newEmotion = this.emotionsRepository.create(emotion);
    return this.emotionsRepository.save(newEmotion);
  }

  findAll(): Promise<Emotion[]> {
    return this.emotionsRepository.find();
  }

  findOne(id: string): Promise<Emotion> {
    return this.emotionsRepository.findOne({ where: { id } });
  }

  async update(id: string, emotion: Partial<Emotion>): Promise<Emotion> {
    const checkExistence = await this.emotionsRepository.findOne({ where: { id } });

    if(checkExistence){
      await this.emotionsRepository.update(id, emotion);
      return checkExistence;
    }else{
      throw new ConflictException('Register not found')
    }
  }

  async remove(id: string): Promise<void> {
    await this.emotionsRepository.delete(id);
  }
}
