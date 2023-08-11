import { BaseEntity } from '../../config/base-entity';
import { UsersProjects } from '../../users/entities/user-project.entity';
import { Entity, Column, OneToMany } from 'typeorm';

@Entity({ name: 'projects' })
export class Project extends BaseEntity {
  @Column({ type: 'text', nullable: false })
  name: string;
  @Column({ type: 'text', nullable: true })
  description: string;

  @OneToMany(() => UsersProjects, (usersProjects) => usersProjects.project)
  usersIncludes: UsersProjects[];
}
