import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class PropertyUpdateDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  state?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  totalArea?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  arableArea?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  vegetationArea?: number;
}
