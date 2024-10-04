import { Module } from '@nestjs/common';
import { LectureService } from './lecture.service';
import { LectureController } from './lecture.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lecture } from './entity/lecture.entity';
import { SpecialLecture } from './entity/special-lecture.entity';
import { LectureApplication } from './entity/lecture-application.entity';
import { LectureRepositoryImpl } from './repository/lecture.repository.impl';

@Module({
  imports: [
    TypeOrmModule.forFeature([Lecture, SpecialLecture, LectureApplication]),
  ],
  providers: [LectureService, LectureRepositoryImpl],
  controllers: [LectureController],
})
export class LectureModule {}
