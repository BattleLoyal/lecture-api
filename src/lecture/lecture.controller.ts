import { Controller, Post, Param, Body } from '@nestjs/common';
import { LectureService } from './lecture.service';
import { ValidationPipe } from '@nestjs/common';
import { ApplyLectureDto } from 'src/lecture/dto/apply-lecture.dto';

@Controller('lecture')
export class LectureController {
  constructor(private readonly lectureService: LectureService) {}

  @Post(':id/apply')
  async applyForLecture(
    @Param('id') specialLectureId: number,
    @Body(new ValidationPipe()) applyLectureDto: ApplyLectureDto,
  ) {
    return this.lectureService.applyForLecture(
      specialLectureId,
      applyLectureDto,
    );
  }
}
