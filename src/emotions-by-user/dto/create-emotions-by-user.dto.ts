import { IsNotEmpty, IsString, IsNumber, IsOptional, Min, Max, IsArray, IsJSON, IsDate } from "class-validator";
import { Journal } from "src/journal/entities/journal.entity";

export class CreateEmotionsByUserDto {
  @IsNotEmpty()
  @IsString()
  emotion: string; // ID de la emoción seleccionada

  @IsNotEmpty()
  @IsDate()
  creationDate: Date; //el valor lo pickea el usuario en el front...
  //es probable que venga del front como day, month, year, hour, minute, second, y se tenga que convertir a Date

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(10)
  intensity: number; // Intensidad del 1 al 10

  @IsNotEmpty()
  @IsString()
  note: string; // Nota obligatoria

  @IsOptional()
  @IsJSON()
  journal?: Journal; // Campo opcional para journal
}