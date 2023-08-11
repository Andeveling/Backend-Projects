import { BaseEntity } from '../../config/base-entity';
import { Role } from '../../roles/role.enum';
import { Column, Entity, JoinColumn, OneToMany, Unique } from 'typeorm';
import { UsersProjects } from './user-project.entity';

@Entity({ name: 'users' })
@Unique(['email'])
export class User extends BaseEntity {
  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: Role, default: Role.User })
  roles: Role;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => UsersProjects, (usersProjects) => usersProjects.user)
  projectsIncludes: UsersProjects[];
}
