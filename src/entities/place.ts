import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import Apply from "./apply";

@Entity('place')
export default class Place {
  @PrimaryGeneratedColumn({ name: 'idx' })
  idx!: number;

  // apply_idx 

  // place_teacher_idx

  @Column({ name: 'room' })
  room!: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}