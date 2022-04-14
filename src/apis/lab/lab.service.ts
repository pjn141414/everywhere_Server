import { Injectable } from '@nestjs/common';
import Place from 'src/entities/place';
import { LabRepository } from './repositories/lab.repository';

@Injectable()
export class LabService {
  constructor(
    private readonly labRepository: LabRepository,
  ) { }

  /**
   * @description 자습실 전체 조회 (enum 순서대로)
   */
  async getLabs(): Promise<Place[]> {
    return await this.labRepository.getLabs();
  }

  /**
   * @description (학생용) 자습실 신청
   */


  /**
   * @description (학생용) 자습실 신청 삭제
   */


  /**
  * @description (학생용) 해당 유저의 자습실 신청 전체 조회
  */


  /**
   * @description (학생용) 해당 유저의 특정 자습실 신청 조회
   */


  /**
   * @description (교사용) 자습실 배치
   */


  /**
   * @description (교사용) 자습실 배치 취소?
   */
} 
