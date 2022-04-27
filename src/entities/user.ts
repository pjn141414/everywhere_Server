import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryColumn
} from "typeorm";
import Apply from "./apply";
import Night from "./night";
import Place from "./place";

@Entity('user')
export default class User {
  // dodam user unique_id
  @PrimaryColumn({ name: 'id' })
  id!: string;

  @Column({ name: 'name' })
  name!: string;

  @Column({ name: 'email' })
  email!: string;

  @Column({
    name: 'grade',
    nullable: true
  })
  grade: number;

  @Column({
    name: 'class',
    nullable: true
  })
  class: number;

  @Column({
    name: 'number',
    nullable: true
  })
  number: number;

  @Column({ name: 'access_level' })
  accessLevel!: number;

  @Column({
    name: 'profile_image',
    nullable: true
  })
  profileImage?: string;

  @OneToMany(type => Night, night => night.user)
  night!: Night[];

  @OneToMany(type => Apply, apply => apply.student)
  apply!: Apply[];

  @OneToMany(type => Place, place => place.teacher)
  place!: Place[];
}