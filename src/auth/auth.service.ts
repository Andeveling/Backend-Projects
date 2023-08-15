import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { ErrorManager } from 'src/utils/error.manager';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { HASH_SALT } from 'src/constants/env';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  public async signIn(signInDto: SignInDto) {
    try {
      const findUser = await this.validateUser(
        signInDto.email,
        signInDto.password,
      );

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
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async logout(userId: string) {
   return 'logout';
  }

  public async signUp(signUpDto: SignUpDto) {
    try {
      const findUser = await this.usersService.findOneByEmail(signUpDto.email);
      if (findUser)
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: `User with email ${signUpDto.email} already exists`,
        });

      const { password } = signUpDto;
      const plaintToHash = await hash(password, HASH_SALT);

      const newUser = {
        ...signUpDto,
        password: plaintToHash,
      };

      return this.usersService.create(newUser);
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async validateUser(username: string, password: string) {
    try {
      const userByUsername = await this.usersService.findBy({
        key: 'username',
        value: username,
      });
      const userByEmail = await this.usersService.findBy({
        key: 'email',
        value: username,
      });

      if (userByUsername || userByEmail) {
        const user = userByUsername || userByEmail;
        const checkPassword = await compare(password, user.password);
        if (!checkPassword)
          throw new ErrorManager({
            type: 'UNAUTHORIZED',
            message: 'Invalid password',
          });
        return user;
      }
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
