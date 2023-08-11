import { IsEnum, IsNotEmpty } from 'class-validator';
import { Project } from 'src/projects/entities/project.entity';
import { AccessLevel } from 'src/roles/role.enum';
import { User } from '../entities/user.entity';

export class UserToProjectDto {
  @IsNotEmpty()
  userId: User['id'];
  @IsNotEmpty()
  projectId: Project['id'];

  @IsNotEmpty()
  @IsEnum(AccessLevel)
  accessLevel: AccessLevel;
}
