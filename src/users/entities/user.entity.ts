import { Column, Entity, OneToMany, Unique } from 'typeorm';
import { BaseEntity } from '../../config/base-entity';
import { RoleEnum } from '../../roles/role.enum';
import { UsersProjects } from './user-project.entity';

@Entity({ name: 'users' })
@Unique(['email', 'username'])
export class User extends BaseEntity {
  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: RoleEnum, default: RoleEnum.User })
  roles: RoleEnum;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => UsersProjects, (usersProjects) => usersProjects.user)
  projectsIncludes: UsersProjects[];
}
