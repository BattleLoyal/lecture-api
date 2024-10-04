import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { LectureRepository } from './lecture.repository';
import { SpecialLecture } from '../entity/special-lecture.entity';
import { LectureApplication } from '../entity/lecture-application.entity';

@Injectable()
export class LectureRepositoryImpl implements LectureRepository {
  constructor(
    @InjectRepository(SpecialLecture)
    private readonly specialLectureRepo: Repository<SpecialLecture>,
    @InjectRepository(LectureApplication)
    private readonly applicationRepo: Repository<LectureApplication>,
  ) {}

  // 트랜잭션을 관리
  async transaction<T>(
    operation: (manager: EntityManager) => Promise<T>,
  ): Promise<T> {
    return await this.specialLectureRepo.manager.transaction(operation);
  }

  // 특강을 비관적 락을 통해 조회 (특정 특강 ID로 조회)
  async findSpecialLectureForUpdate(
    lectureId: number,
    manager: EntityManager,
  ): Promise<SpecialLecture> {
    return manager
      .getRepository(SpecialLecture)
      .createQueryBuilder('specialLecture')
      .setLock('pessimistic_write') // 비관적 잠금 설정
      .where('specialLecture.id = :id', { id: lectureId })
      .getOne();
  }

  // 특강 신청 정보 저장
  async saveLectureApplication(
    application: LectureApplication,
    manager: EntityManager,
  ): Promise<LectureApplication> {
    return manager.save(application);
  }

  // 특강의 남은 자리 업데이트
  async updateSpecialLectureSeats(
    specialLecture: SpecialLecture,
    manager: EntityManager,
  ): Promise<void> {
    await manager.save(specialLecture); // 남은 자리를 업데이트
  }
}
