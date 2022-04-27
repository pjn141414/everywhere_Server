import { IsNotEmpty, IsNumber } from "class-validator";

export default class AddPlaceDto {
  @IsNotEmpty()
  @IsNumber()
  applyIdx!: number;

  @IsNotEmpty()
  @IsNumber()
  room!: number;
}