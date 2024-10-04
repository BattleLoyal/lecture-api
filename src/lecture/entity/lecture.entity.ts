import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { SpecialLecture } from './special-lecture.entity';

@Entity('lectures')
export class Lecture {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  instructor_name: string;

  @Column()
  lecture_title: string;

  @OneToMany(() => SpecialLecture, (specialLecture) => specialLecture.lecture)
  specialLectures: SpecialLecture[];
}
