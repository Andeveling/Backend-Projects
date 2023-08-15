import { IsEnum, IsNotEmpty } from 'class-validator';
import { Project } from 'src/projects/entities/project.entity';
import { AccessLevelEnum} from 'src/roles/role.enum';
import { User } from '../entities/user.entity';

export class UserToProjectDto {
  @IsNotEmpty()
  user_id: User['id'];
  @IsNotEmpty()
  project_id: Project['id'];

  @IsNotEmpty()
  @IsEnum(AccessLevelEnum)
  accessLevel: AccessLevelEnum;
}
