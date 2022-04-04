import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  RelationId
} from "typeorm";
import Apply from "./apply";
import User from "./user";

@Entity('place')
export default class Place {
  @PrimaryGeneratedColumn({ name: 'idx' })
  idx!: number;

  // apply idx
  @RelationId((place: Place) => place.apply)
  applyIdx!: number;

  @JoinColumn({ name: 'fk_apply_idx' })
  @OneToOne(type => Apply, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  apply!: Apply;

  // place teacher id
  @RelationId((place: Place) => place.teacher)
  teacherId!: string;

  @JoinColumn({ name: 'fk_user_id' })
  @OneToOne(type => User, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  teacher!: User;

  @Column({ name: 'room' })
  room!: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}