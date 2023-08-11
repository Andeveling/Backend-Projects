import { BaseEntity } from '../../config/base-entity';
import { Entity, JoinColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Project } from '../../projects/entities/project.entity';
import { AccessLevel } from '../../roles/role.enum';

@Entity({ name: 'users_projects' })
export class UsersProjects extends BaseEntity {
  @Column({ type: 'enum', enum: AccessLevel })
  accessLevel: AccessLevel;

  @ManyToOne(() => User, (user) => user.projectsIncludes)
  user: User;

  @ManyToOne(() => Project, (project) => project.usersIncludes)
  project: Project;
}
