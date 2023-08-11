import { IsString, MaxLength } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @MaxLength(100)
  name: string;
  @IsString()
  @MaxLength(200)
  description: string;
}
