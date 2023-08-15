import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';
import { ErrorManager } from 'src/utils/error.manager';
import { UsersProjects } from 'src/users/entities/user-project.entity';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { AccessLevelEnum } from 'src/roles/role.enum';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(UsersProjects)
    private readonly userProjectRepository: Repository<UsersProjects>,
    private readonly usersService: UsersService,
  ) {}

  async create(
    createProjectDto: CreateProjectDto,
    userId: User['id'],
  ): Promise<any> {
    try {
      // const user = await this.usersService.findOne(userId);
      const project = await this.projectRepository.save(createProjectDto);
      return project;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  findAll() {
    try {
      return this.projectRepository.find();
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} project`;
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} project`;
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }
}
