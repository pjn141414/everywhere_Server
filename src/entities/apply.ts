import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, RelationId } from "typeorm";
import Room from "./room";

@Entity('apply')
export default class Apply {
  @PrimaryGeneratedColumn({ name: 'idx' })
  idx!: number;

  @Column({ name: 'team_name' })
  teamName!: string;

  @Column({ name: 'form_file' })
  formFile!: string;

  // apply_student_idx

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