import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn, RelationId } from "typeorm";
import User from "./user";

@Entity('night')
export default class Night {
  @PrimaryGeneratedColumn({ name: 'idx' })
  idx!: number;

  @RelationId((night: Night) => night.user)
  userId!: string;

  @JoinColumn({ name: 'fk_user_id' })
  @ManyToOne(type => User, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user!: User;

  @Column({ name: 'room' })
  room!: number;
}