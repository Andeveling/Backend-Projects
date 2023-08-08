import { Role } from 'src/roles/role.enum';
import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity({ name: 'users' })
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: Role, array: true, default: [Role.User] })
  roles: Role[];

  @Column({ default: true })
  isActive: boolean;
}
