import { Type } from 'class-transformer';
import {
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
} from 'class-validator';

export class CropListDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  page?: number;
  @IsOptional()
  @IsInt()
  @Min(5)
  @Type(() => Number)
  limit?: number;
  @IsOptional()
  @IsString()
  name?: string;
  @IsOptional()
  @IsNumber()
  @IsInt()
  @Min(1970)
  @Max(new Date().getFullYear() + 1)
  @Type(() => Number)
  year?: number;
  @IsOptional()
  @IsString()
  @IsUUID()
  propertyId?: string;
}
