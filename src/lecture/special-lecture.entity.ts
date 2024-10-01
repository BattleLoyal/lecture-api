import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Lecture } from './lecture.entity';
import { LectureApplication } from './lecture-application.entity';

@Entity()
export class SpecialLecture {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  lecture_date: string;

  @Column()
  capacity: number;

  @Column()
  remaining_seats: number;

  @ManyToOne(() => Lecture, (lecture) => lecture.specialLectures)
  lecture: Lecture;

  @OneToMany(
    () => LectureApplication,
    (application) => application.specialLecture,
  )
  application: LectureApplication[];
}
