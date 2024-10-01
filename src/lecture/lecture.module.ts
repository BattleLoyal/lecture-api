import { Module } from '@nestjs/common';
import { LectureService } from './lecture.service';
import { LectureController } from './lecture.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lecture } from './lecture.entity';
import { SpecialLecture } from './special-lecture.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Lecture, SpecialLecture])],
  providers: [LectureService],
  controllers: [LectureController],
})
export class LectureModule {}
