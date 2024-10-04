import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Unique,
} from 'typeorm';
import { SpecialLecture } from './special-lecture.entity';

@Entity('lecture_applications')
@Unique(['userId', 'specialLectureId'])
export class LectureApplication {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  applicationDate: string;

  @Column()
  specialLectureId: number;

  @ManyToOne(
    () => SpecialLecture,
    (specialLecture) => specialLecture.application,
  )
  specialLecture: SpecialLecture;
}
