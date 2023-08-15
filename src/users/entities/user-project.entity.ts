import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../config/base-entity';
import { Project } from '../../projects/entities/project.entity';
import { AccessLevelEnum } from '../../roles/role.enum';
import { User } from './user.entity';

@Entity({ name: 'users_projects' })
export class UsersProjects extends BaseEntity {
  @Column({ type: 'enum', enum: AccessLevelEnum })
  accessLevel: AccessLevelEnum;

  @ManyToOne(() => User, (user) => user.projectsIncludes)
  user: User;

  @ManyToOne(() => Project, (project) => project.usersIncludes)
  project: Project;
}
