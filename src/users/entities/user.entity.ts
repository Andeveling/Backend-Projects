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

  @Column({ default: true })
  isActive: boolean;
  
}
