import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CropUpdateDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  season?: string;

  @IsOptional()
  @IsString()
  propertyId?: string;
}
