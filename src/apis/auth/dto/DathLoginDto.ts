import { IsNotEmpty, IsString } from "class-validator";
import { Entity } from "typeorm";

@Entity('user')
export default class DauthLoginDto {
  @IsNotEmpty()
  @IsString()
  code!: string;
}