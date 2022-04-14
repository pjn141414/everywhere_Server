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

  @Column({ name: 'grade' })
  grade!: number;

  @Column({ name: 'class' })
  class!: number;

  @Column({ name: 'number' })
  number!: number;

  @Column({ name: 'access_level' })
  accessLevel!: number;

  @Column({ name: 'profile_image' })
  profileImage!: string;

  @OneToMany(type => Night, night => night.user)
  night!: Night[];

  @OneToMany(type => Apply, apply => apply.student)
  apply!: Apply[];

  @OneToOne(type => Place, place => place.teacher)
  place!: Place;
}