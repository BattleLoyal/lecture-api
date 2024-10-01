import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { SpecialLecture } from './special-lecture.entity';

@Entity()
export class LectureApplication {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  applicationDate: string;

  @ManyToOne(
    () => SpecialLecture,
    (specialLecture) => specialLecture.application,
  )
  specialLecture: SpecialLecture;
}
