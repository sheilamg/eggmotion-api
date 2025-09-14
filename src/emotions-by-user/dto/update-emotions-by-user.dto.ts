import { PartialType } from '@nestjs/mapped-types';
import { CreateEmotionsByUserDto } from './create-emotions-by-user.dto';

export class UpdateEmotionsByUserDto extends PartialType(CreateEmotionsByUserDto) {}
