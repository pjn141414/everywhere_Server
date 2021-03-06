import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export default class AddApplyDto {
  @IsNotEmpty()
  @IsString()
  teamName!: string;

  @IsNotEmpty()
  @IsString()
  formFile!: string;

  @IsNotEmpty()
  @IsNumber()
  type!: number;

  @IsOptional()
  @IsNumber()
  room!: number;
}