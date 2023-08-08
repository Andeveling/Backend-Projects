import { IsEmail, IsString, IsNotEmpty, Length } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'The name must be a string' })
  @Length(2, 30, {
    message: 'The name must be at least 2 but not longer than 30 characters',
  })
  @IsNotEmpty({ message: 'The name is required' })
  username: string;

  @IsEmail({}, { message: 'Incorrect email' })
  @IsNotEmpty({ message: 'The email is required' })
  email: string;

  @IsString({ message: 'The password must be a string' })
  @Length(6, 30, {
    message:
      'The password must be at least 6 but not longer than 30 characters',
  })
  @IsNotEmpty({ message: 'The password is required' })
  password: string;
}
