import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmotionByUser } from './entities/emotion_by_user.entity';
import { CreateEmotionsByUserDto } from './dto/create-emotions-by-user.dto';
import { User } from '../users/entities/user.entity';
import { Emotion } from '../emotions/entities/emotion.entity';

@Injectable()
export class EmotionsByUserService {
  constructor(
    @InjectRepository(EmotionByUser)
    private emotionsByUserRepository: Repository<EmotionByUser>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Emotion)
    private emotionsRepository: Repository<Emotion>,
  ) {}


  /*
    {
    "user": { "id": "uuid-usuario" },
    "emotion": { "id": "uuid-emocion", "emoji": "😊" },
    "date": "2025-06-18T10:00:00.000Z",
    "note": "Feliz después de hablar con mi mejor amigo"}*/
  async create(createDto: CreateEmotionsByUserDto, currentUser): Promise<EmotionByUser> {
    // Verificar que la emoción existe
    const emotion = await this.emotionsRepository.findOne({ 
      where: { id: createDto.emotion } 
    });
    console.log(currentUser)
    
    if (!emotion) {
      throw new NotFoundException(`Emotion with ID ${createDto.emotion} not found`);
    }

    // Crear el registro de emoción por usuario
    const emotionByUser = this.emotionsByUserRepository.create({
      emotion: { id: createDto.emotion },
      user: { id: currentUser.userId },
      intensity: createDto.intensity,
      note: createDto.note,
      journal: createDto?.journal || null,
      creationDate: createDto.creationDate
    });

    return this.emotionsByUserRepository.save(emotionByUser);
  }

  async findAll(currentUser) {
    const emotionsByUser = await this.emotionsByUserRepository.find({
      where: { user: { id: currentUser.userId } },
      relations: ['emotion', 'user'],
      order: { creationDate: 'DESC' }
    });
    
    return emotionsByUser.map(entry => ({
      id: entry.id,
      emotion: {
        id: entry.emotion.id,
        name: entry.emotion.emotion,
        emoji: entry.emotion.emoji,
      },
      intensity: entry.intensity,
      note: entry.note,
      journal: entry?.journal || null,
      creationDate: entry.creationDate,
    }));
  }

  async findOne(id: string, currentUser): Promise<EmotionByUser> {
    const emotionByUser = await this.emotionsByUserRepository.findOne({ 
      where: { id, user: { id: currentUser.userId } },
      relations: ['emotion', 'user']
    });
    
    if (!emotionByUser) {
      throw new NotFoundException(`Emotion record not found`);
    }
    
    return emotionByUser;
  }

  async update(id: string, updateDto: Partial<CreateEmotionsByUserDto>, currentUser): Promise<EmotionByUser> {
    // Verificar que el registro existe y pertenece al usuario
    const existing = await this.findOne(id, currentUser);
    
    // Si se está actualizando la emoción, verificar que existe
    if (updateDto.emotion) {
      const emotion = await this.emotionsRepository.findOne({ 
        where: { id: updateDto.emotion } 
      });
      
      if (!emotion) {
        throw new NotFoundException(`Emotion with ID ${updateDto.emotion} not found`);
      }
    }

    // Actualizar solo los campos permitidos
    const updateData: any = {};
    if (updateDto.emotion) updateData.emotion = { id: updateDto.emotion };
    if (updateDto.intensity !== undefined) updateData.intensity = updateDto.intensity;
    if (updateDto.note !== undefined) updateData.note = updateDto.note;
    if (updateDto.journal !== undefined) updateData.journal = updateDto.journal;

    await this.emotionsByUserRepository.update(id, updateData);
    return this.findOne(id, currentUser);
  }

  async remove(id: string, currentUser): Promise<void> {
    // Verificar que el registro existe y pertenece al usuario
    await this.findOne(id, currentUser);
    await this.emotionsByUserRepository.delete(id);
  }

  async findByUser(userId: string) {
    return this.emotionsByUserRepository.find({
      where: { user: { id: userId } },
      relations: ['emotion', 'user'],
      order: { creationDate: 'DESC' }
    });
  }
}
