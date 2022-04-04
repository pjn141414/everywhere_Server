import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('apply')
export default class Apply {
  @PrimaryGeneratedColumn({ name: 'idx' })
  idx!: number;

  @Column({ name: 'team_name' })
  teamName!: string;

  @Column({ name: 'form_file' })
  formFile!: string;

  // apply_student_idx

  @Column({ name: 'room' })
  room!: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}