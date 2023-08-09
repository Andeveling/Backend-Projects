import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { hash, compare } from 'bcrypt';
import { SignInDto } from './dto/sign-in.dto';
import { User } from 'src/users/entities/user.entity';
import { SignUpDto } from './dto/sign-up.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDto) {
    const findUser = await this.usersService.findOneByEmail(signInDto.email);
    if (!findUser)
      throw new HttpException('Invalid credentials', HttpStatus.NOT_FOUND);
    const checkPassword = await compare(signInDto.password, findUser.password);
    if (!checkPassword) throw new UnauthorizedException('Invalid password');

    const payload = {
      id: findUser.id,
      username: findUser.username,
      email: findUser.email,
      roles: findUser.roles,
    };

    const token = await this.jwtService.signAsync(payload);

    const data = {
      user: payload,
      token,
    };

    return data;
  }

  async signUp(signUpDto: SignUpDto) {
    const findUser = await this.usersService.findOneByEmail(signUpDto.email);
    if (findUser)
      throw new HttpException(
        `User with email ${signUpDto.email} already exists`,
        400,
      );

    const { password } = signUpDto;
    const plaintToHash = await hash(password, 10);

    const newUser = {
      ...signUpDto,
      password: plaintToHash,
    };

    return this.usersService.create(newUser);
  }
}
