import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  RelationId
} from "typeorm";
import Place from "./place";
import User from "./user";

@Entity('apply')
export default class Apply {
  @PrimaryGeneratedColumn({ name: 'idx' })
  idx!: number;

  @Column({ name: 'team_name' })
  teamName!: string;

  @Column({ name: 'form_file' })
  formFile!: string;

  @Column({ name: 'room' })
  room!: number;

  @RelationId((apply: Apply) => apply.student)
  studentId!: string;

  @JoinColumn({ name: 'fk_student_id' })
  @ManyToOne(type => User, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  student!: User;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @OneToOne(type => Place, place => place.apply)
  place!: Place;
}