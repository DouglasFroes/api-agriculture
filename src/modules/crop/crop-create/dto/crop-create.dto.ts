import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CropCreateDto {
  @IsString()
  name: string;

  @IsNumber()
  @IsInt()
  @Min(1970)
  @Max(new Date().getFullYear() + 1)
  @IsNotEmpty()
  year: number;

  @IsString()
  @IsNotEmpty()
  propertyId: string;
}
