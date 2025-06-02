import { IsInt, IsNotEmpty, IsString, IsUUID, Min } from 'class-validator';

export class PropertyCreateDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsInt()
  @Min(0)
  totalArea: number;

  @IsInt()
  @Min(0)
  arableArea: number;

  @IsInt()
  @Min(0)
  vegetationArea: number;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  producerId: string;
}
