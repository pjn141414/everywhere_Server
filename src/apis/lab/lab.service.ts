import { BadRequestException, ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import Apply from 'src/entities/apply';
import Place from 'src/entities/place';
import User from 'src/entities/user';
import { UserRepository } from '../auth/repositories/user.repository';
import AddApplyDto from './dto/addApply.dto';
import AddPlaceDto from './dto/addPlace.dto';
import { ApplyRepository } from './repositories/apply.repository';
import { PlaceRepository } from './repositories/place.repository';

@Injectable()
export class LabService {
  constructor(
    private readonly placeRepository: PlaceRepository,
    private readonly applyRespository: ApplyRepository,
    private readonly userRepository: UserRepository,
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
  async addApply(user: User, data: AddApplyDto): Promise<any> {
    if (user.accessLevel !== 1) {
      throw new ForbiddenException('학생만 접근 가능합니다.');
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
  async addPlace(user: User, data: AddPlaceDto): Promise<any> {
    const { applyIdx, room }: { applyIdx: number, room: number } = data;

    if (user.accessLevel !== 2 && user.accessLevel !== 3 && user.accessLevel !== 4) {
      throw new ForbiddenException('선생님 혹은 관리자만 접근 가능합니다.');
    }

    const isDuplicate: Place | undefined = await this.placeRepository.findOne(applyIdx);
    if (isDuplicate) {
      throw new ConflictException('이미 배치된 신청입니다.');
    }

    const apply: Apply | undefined = await this.applyRespository.findOne(applyIdx);
    if (apply === undefined) {
      throw new NotFoundException('해당 신청이 없습니다.');
    }

    const place: Place = this.placeRepository.create({
      apply: apply,
      room: room,
      teacher: user,
    });

    await this.placeRepository.save(place);
  }

  /**
   * @description (교사용) 자습실 배치 수정
   */

  /**
   * @description (교사용) 자습실 신청 삭제
   */


}