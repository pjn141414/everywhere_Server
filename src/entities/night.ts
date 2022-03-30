import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, RelationId } from "typeorm";
import Room from "./room";

@Entity('night')
export default class Night {
  @PrimaryGeneratedColumn({ name: 'idx' })
  idx!: number;

  @RelationId((night: Night) => night.room)
  roomIdx!: number;

  @JoinColumn({ name: 'fk_room_idx' })
  @OneToOne(type => Room, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  room!: Room;
}