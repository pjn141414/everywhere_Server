import { type } from "os";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import Apply from "./apply";
import Night from "./night";
import Place from "./place";

@Entity('room')
export default class Room {
  @PrimaryGeneratedColumn({ name: 'idx' })
  idx!: number;

  @Column({ name: 'room_name' })
  roomName!: string;

  @OneToOne(type => Apply, apply => apply.room)
  apply!: Apply;

  @OneToOne(type => Place, place => place.room)
  place!: Place;

  @OneToOne(type => Night, night => night.room)
  night!: Night;
}