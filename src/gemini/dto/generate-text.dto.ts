import { IsString, IsOptional, IsNumber } from 'class-validator';

export class GenerateTextDto {
    @IsString()
    prompt: string;

    @IsOptional()
    @IsString()
    model?: string;

    @IsOptional()
    @IsNumber()
    maxOutputTokens?: number;
}