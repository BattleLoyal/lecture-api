import { IsNotEmpty, IsInt } from 'class-validator';

export class ApplyLectureDto {
  @IsInt()
  @IsNotEmpty()
  userId: number;
}
