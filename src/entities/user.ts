import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import Night from "./night";

@Entity('user')
export default class User {
  @PrimaryColumn({ name: 'id' })
  id!: string;

  @Column({ name: 'name' })
  name!: string;

  @Column({ name: 'email' })
  email!: string;

  @Column({ name: 'grade' })
  grade!: number;

  @Column({ name: 'class' })
  class!: number;

  @Column({ name: 'number' })
  number!: number;

  @Column({ name: 'access_level' })
  accessLevel!: number;

  @Column({ name: 'profile_image' })
  profile_image!: string;

  @OneToMany(type => Night, night => night.user)
  night!: Night[];
}