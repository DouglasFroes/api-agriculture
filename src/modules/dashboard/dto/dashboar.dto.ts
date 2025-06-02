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

export class DashboardDto {
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
  @IsOptional()
  @IsString()
  @IsUUID()
  producerId?: string;
  @IsOptional()
  @IsString()
  state?: string;
  @IsOptional()
  @IsString()
  city?: string;
}
