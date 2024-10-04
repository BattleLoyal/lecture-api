import { SpecialLecture } from '../entity/special-lecture.entity';
import { LectureApplication } from '../entity/lecture-application.entity';
import { EntityManager } from 'typeorm';

export interface LectureRepository {
  transaction<T>(operation: (manager: EntityManager) => Promise<T>): Promise<T>;
  findSpecialLectureForUpdate(
    lectureId: number,
    manager: EntityManager,
  ): Promise<SpecialLecture>;
  saveLectureApplication(
    application: LectureApplication,
    manager: EntityManager,
  ): Promise<LectureApplication>;
  updateSpecialLectureSeats(
    specialLecture: SpecialLecture,
    manager: EntityManager,
  ): Promise<void>;
}
