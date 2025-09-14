import { Module } from '@nestjs/common';
import { EmotionsByUserService } from './emotions_by_user.service';
import { EmotionsByUserController } from './emotions_by_user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmotionByUser } from './entities/emotion_by_user.entity';
import { User } from '../users/entities/user.entity';
import { Emotion } from '../emotions/entities/emotion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EmotionByUser, User, Emotion])],
  controllers: [EmotionsByUserController],
  providers: [EmotionsByUserService],
})
export class EmotionsByUserModule {}
