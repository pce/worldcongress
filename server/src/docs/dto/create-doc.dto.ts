// import { IsDateString, IsNotEmpty, IsOptional, Length } from "class-validator";

export class CreateDocDto {
  // @Length(2, 255, {message: "The name lenght has to be between 2 and 255"})
  title: string;
  // @IsNotEmpty()
  text: string;
  /*
  @IsOptional()
  @IsDateString()
  started_at?: string;
  
  @IsOptional()  
  @IsDateString()
  ended_at?: string;
  */
}