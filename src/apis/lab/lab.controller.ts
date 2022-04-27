import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards } from '@nestjs/common';
import Apply from 'src/entities/apply';
import Place from 'src/entities/place';
import User from 'src/entities/user';
import { Token } from 'src/lib/decorators/token.decorator';
import { AuthGuard } from 'src/lib/guard/auth.guard';
import BaseReponse from 'src/lib/response/base.response';
import AddApplyDto from './dto/addApply.dto';
import AddPlaceDto from './dto/addPlace.dto';
import { LabService } from './lab.service';

@Controller('lab')
export class LabController {
  constructor(
    private readonly labService: LabService,
  ) { }

  @Get('/')
  @HttpCode(200)
  async getLabs() {
    const labs: Place[] = await this.labService.getLabs();

    return new BaseReponse(200, '자습실 전체 조회 성공', labs);
  }

  @Post('/')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  async addApply(@Token() user: User, @Body() data: AddApplyDto) {
    const apply = await this.labService.addApply(user, data);

    return new BaseReponse(200, '자습실 신청 성공', apply);
  }

  @Get('/apply')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  async getApplyByStudent(@Token() user: User) {
    const applys: Apply[] = await this.labService.getApplyByStudent(user);

    return new BaseReponse(200, '특정 학생의 자습실 신청 전체 조회 성공', applys);
  }

  @Post('/place')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  async addPlace(@Token() user: User, @Body() data: AddPlaceDto) {
    const place = await this.labService.addPlace(user, data);

    return new BaseReponse(200, '자습실 배치 성공', place);
  }

  @Delete('/place/:idx')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  async deletePlace(@Token() user: User, @Param('idx') placeIdx: number) {
    const place = await this.labService.deletePlace(user, placeIdx);

    return new BaseReponse(200, '자습실 배치 삭제 성공', place);
  }
}