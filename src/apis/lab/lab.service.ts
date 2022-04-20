import { BadRequestException, Injectable } from '@nestjs/common';
import Apply from 'src/entities/apply';
import Place from 'src/entities/place';
import User from 'src/entities/user';
import AddLabDto from './dto/addLab.dto';
import { ApplyRepository } from './repositories/apply.repository';
import { PlaceRepository } from './repositories/place.repository';

@Injectable()
export class LabService {
  constructor(
    private readonly placeRepository: PlaceRepository,
    private readonly applyRespository: ApplyRepository,
  ) { }

  /**
   * @description 자습실 전체 조회 (enum 순서대로)
   */
  async getLabs(): Promise<Place[]> {
    return await this.placeRepository.getLabs();
  }

  /**
   * @description (학생용) 자습실 신청
   */
  async addApply(user: User, data: AddLabDto): Promise<any> {
    if (user.accessLevel !== 1) {
      throw new BadRequestException('학생만 접근 가능합니다.');
    }

    const apply = this.applyRespository.create({
      teamName: data.teamName,
      formFile: data.formFile,
      type: data.type,
      room: data.room,
      student: user,
    });

    await this.applyRespository.save(apply);
  }

  /**
  * @description (학생용) 해당 유저의 자습실 신청 전체 조회
  */
  async getApplyByStudent(user: User): Promise<Apply[]> {
    return await this.applyRespository.getApplysByStudentId(user.id);
  }

  /**
   * @description (교사용) 자습실 배치
   */
  async addTeam(user: User, applyIdx: number): Promise<any> {

  }

  /**
   * @description (교사용) 자습실 배치 취소
   */
}