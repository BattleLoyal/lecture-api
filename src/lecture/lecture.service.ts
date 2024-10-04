import { Injectable, ConflictException } from '@nestjs/common';
import { ApplyLectureDto } from './dto/apply-lecture.dto';
import { ApplyLectureResponse } from './lecture.model';
import { LectureRepository } from './repository/lecture.repository';
import { SpecialLecture } from './entity/special-lecture.entity';
import { LectureApplication } from './entity/lecture-application.entity';
import { LectureRepositoryImpl } from './repository/lecture.repository.impl';

@Injectable()
export class LectureService {
  constructor(private readonly lectureRepository: LectureRepositoryImpl) {}

  // 특강 신청
  async applyForLecture(
    lectureId: number,
    applyDto: ApplyLectureDto,
  ): Promise<ApplyLectureResponse> {
    // 트랜잭션 내에서 비관적 락을 걸어 특강 조회 및 신청 처리
    return await this.lectureRepository.transaction(async (manager) => {
      // 특강 남은 자리 확인 및 특강 조회 (비관적 락 적용)
      const specialLecture =
        await this.lectureRepository.findSpecialLectureForUpdate(
          lectureId,
          manager,
        );

      if (!specialLecture || specialLecture.remaining_seats <= 0) {
        throw new ConflictException(`${lectureId}의 정원이 초과되었습니다.`);
      }

      // 신청 정보 저장
      const application = new LectureApplication();
      application.specialLecture = specialLecture;
      application.userId = applyDto.userId;
      application.applicationDate = new Date().toISOString();

      try {
        // LectureRepositoryImpl을 통해 신청 정보 저장
        await this.lectureRepository.saveLectureApplication(
          application,
          manager,
        );
      } catch (error) {
        console.log(error);
        throw new ConflictException(
          `사용자 ${applyDto.userId}는 이미 특강 ${lectureId}에 신청했습니다.`,
        );
      }

      // 남은 자리 업데이트
      specialLecture.remaining_seats -= 1;
      await this.lectureRepository.updateSpecialLectureSeats(
        specialLecture,
        manager,
      );

      // 응답 DTO 생성 및 반환
      const response = new ApplyLectureResponse();
      response.specialLectureId = lectureId;
      response.userId = applyDto.userId;
      response.message = `${response.userId}님의 ${response.specialLectureId} 신청이 완료되었습니다.`;

      return response;
    });
  }
}
