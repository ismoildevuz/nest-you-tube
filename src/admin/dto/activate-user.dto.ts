import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ActivateUserDto {
  @ApiProperty({
    example: '1a67e604-da74-4e38-a5e5-434c6f5a6976',
    description: 'The ID of the user to activate/deactivate',
  })
  @IsNotEmpty()
  @IsString()
  user_id: string;
}
