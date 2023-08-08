import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { hash, compare } from 'bcrypt';
import { SignInDto } from './dto/sign-in.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDto) {
    const findUser = await this.usersService.findOneByEmail(signInDto.email);
    if (!findUser) throw new HttpException('Invalid credentials', 401);
    const checkPassword = await compare(signInDto.password, findUser.password);
    if (!checkPassword) throw new UnauthorizedException('Invalid credentials');

    const payload = {
      sub: findUser.id,
      username: findUser.username,
      email: findUser.email,
    };

    const token = await this.jwtService.signAsync(payload);

    const data = {
      user: payload,
      token,
    };

    return data;
  }

  async signUp(createUserDto: CreateUserDto) {
    const findUser = await this.usersService.findOneByEmail(
      createUserDto.email,
    );
    if (findUser)
      throw new HttpException(
        `User with email ${createUserDto.email} already exists`,
        400,
      );

    const { password } = createUserDto;
    const plaintToHash = await hash(password, 10);

    const newUser = {
      ...createUserDto,
      password: plaintToHash,
    };

    return this.usersService.create(newUser);
  }
}
