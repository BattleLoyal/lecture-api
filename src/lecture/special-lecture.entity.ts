import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Lecture } from './lecture.entity';

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
}
