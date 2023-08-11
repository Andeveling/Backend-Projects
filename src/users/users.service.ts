import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignUpDto } from 'src/auth/dto/sign-up.dto';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { ErrorManager } from 'src/utils/error.manager';
import { UserToProjectDto } from './dto/user-to-project.dto';
import { UsersProjects } from './entities/user-project.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(UsersProjects)
    private readonly userProjectRepository: Repository<UsersProjects>,
  ) {}

  async findAll(): Promise<User[]> {
    try {
      const users = await this.userRepository.find();
      if (!users) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Users not found',
        });
      }
      return users;
    } catch (error) {
      throw new ErrorManager.createSignatureError(error.message);
    }
  }

  async findOne(id: string): Promise<any> {
    try {
      // const user: User = await this.userRepository
      //   .createQueryBuilder('user')
      //   .where({ id })
      //   .getOne();
      const user = await this.userRepository.find({
        where: { id },
        relations: ['usersProjects'],
      });
      if (!user) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'User not found',
        });
      }
      return user;
    } catch (error) {
      throw new ErrorManager.createSignatureError(error.message);
    }
  }

  async findOneByEmail(email: string): Promise<User> {
    try {
      const user: User = await this.userRepository
        .createQueryBuilder('user')
        .where({ email })
        .getOne();
      if (!user) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'User not found',
        });
      }
      return user;
    } catch (error) {
      throw new ErrorManager.createSignatureError(error.message);
    }
  }

  async create(signUpDto: SignUpDto): Promise<User> {
    try {
      return this.userRepository.save(signUpDto);
    } catch (error) {
      throw new ErrorManager.createSignatureError(error.message);
    }
  }
  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    try {
      const user = await this.userRepository.update(id, updateUserDto);
      if (user.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'User not found',
        });
      }
      return user;
    } catch (error) {
      throw new ErrorManager.createSignatureError(error.message);
    }
  }

  async remove(id: string): Promise<DeleteResult> {
    try {
      const user = await this.userRepository.delete(id);
      if (user.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'User not found',
        });
      }
      return user;
    } catch (error) {
      throw new ErrorManager.createSignatureError(error.message);
    }
  }

  async relationToProject(body: UserToProjectDto) {
    try {
      return this.userProjectRepository.save(body);
    } catch (error) {
      throw new ErrorManager.createSignatureError(error.message);
    }
  }
}
