import { IsNotEmpty, IsString } from 'class-validator';

export class CropCreateDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  season: string;

  @IsString()
  @IsNotEmpty()
  propertyId: string;
}
