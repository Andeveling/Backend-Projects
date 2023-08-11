import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { ErrorManager } from 'src/utils/error.manager';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDto) {
    try {
      const findUser = await this.usersService.findOneByEmail(signInDto.email);
      if (!findUser)
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'User not found',
        });
      const checkPassword = await compare(
        signInDto.password,
        findUser.password,
      );
      if (!checkPassword)
        throw new ErrorManager({
          type: 'UNAUTHORIZED',
          message: 'Invalid password',
        });

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
    } catch (error) {
      throw new ErrorManager.createSignatureError(error.message);
    }
  }

  async signUp(signUpDto: SignUpDto) {
    try {
      const findUser = await this.usersService.findOneByEmail(signUpDto.email);
      if (findUser)
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: `User with email ${signUpDto.email} already exists`,
        });

      const { password } = signUpDto;
      const plaintToHash = await hash(password, 10);

      const newUser = {
        ...signUpDto,
        password: plaintToHash,
      };

      return this.usersService.create(newUser);
    } catch (error) {
      throw new ErrorManager.createSignatureError(error.message);
    }
  }
}
