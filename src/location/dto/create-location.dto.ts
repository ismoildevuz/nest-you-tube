import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateLocationDto {
  @ApiProperty({ example: 'United States', description: "The country's name" })
  @IsNotEmpty()
  @IsString()
  country: string;
}
