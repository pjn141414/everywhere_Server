import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { UserRepository } from '../auth/repositories/user.repository';
import { TokenModule } from '../token/token.module';
import { LabController } from './lab.controller';
import { LabService } from './lab.service';
import { ApplyRepository } from './repositories/apply.repository';
import { PlaceRepository } from './repositories/place.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ApplyRepository, PlaceRepository, UserRepository]), AuthModule, TokenModule],
  controllers: [LabController],
  providers: [LabService]
})
export class LabModule { }
