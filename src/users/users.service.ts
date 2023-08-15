import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignUpDto } from 'src/auth/dto/sign-up.dto';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { ErrorManager } from 'src/utils/error.manager';
import { UserToProjectDto } from './dto/user-to-project.dto';
import { UsersProjects } from './entities/user-project.entity';
import { Project } from 'src/projects/entities/project.entity';
import { Id } from 'src/interfaces/global.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(UsersProjects)
    private readonly userProjectRepository: Repository<UsersProjects>,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
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
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async findOne(id: Id): Promise<any> {
    try {
      const user: User = await this.userRepository
        .createQueryBuilder('user')
        .where({ id })
        .leftJoinAndSelect('user.projectsIncludes', 'projectsIncludes')
        .leftJoinAndSelect('projectsIncludes.project', 'project')
        .getOne();

      if (!user) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'User not found',
        });
      }
      return user;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async findOneByEmail(email: string): Promise<User> {
    try {
      const user: User = await this.userRepository
        .createQueryBuilder('user')
        .where({ email })
        .getOne();

      return user;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async findBy({
    key,
    value,
  }: {
    key: keyof User;
    value: string | number;
  }): Promise<User> {
    try {
      const user: User = await this.userRepository
        .createQueryBuilder('user')
        .addSelect('user.password')
        .where({ [key]: value })
        .getOne();
      return user;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
  async create(signUpDto: SignUpDto): Promise<User> {
    try {
      return this.userRepository.save(signUpDto);
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
  async update(id: Id, updateUserDto: UpdateUserDto): Promise<UpdateResult> {
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
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async remove(id: Id): Promise<DeleteResult> {
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
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async relationToProject(body: UserToProjectDto) {
    try {
      const { user_id, project_id, accessLevel } = body;
      const user = await this.userRepository.findOne({
        where: { id: user_id },
      });
      const project = await this.projectRepository.findOne({
        where: { id: project_id },
      });
      const newUsersProject = {
        user,
        project,
        accessLevel,
      };
      return this.userProjectRepository.save(newUsersProject);
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
