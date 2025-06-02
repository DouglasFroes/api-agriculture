import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class producerListDto {
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
}
