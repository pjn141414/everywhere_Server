import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, RelationId } from "typeorm";
import Apply from "./apply";
import Room from "./room";

@Entity('place')
export default class Place {
  @PrimaryGeneratedColumn({ name: 'idx' })
  idx!: number;

  // apply_idx 

  // place_teacher_idx

  @RelationId((apply: Apply) => apply.room)
  roomIdx!: number;

  @JoinColumn({ name: 'fk_room_idx' })
  @OneToOne(type => Room, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  room!: Room;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}