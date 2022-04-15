import Apply from "src/entities/apply";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Apply)
export class ApplyRepository extends Repository<Apply> {
  public getApplysByStudentId(userId: string): Promise<Apply[]> {
    return this.createQueryBuilder()
      .where('fk_student_id = :userId', { userId })
      .getMany();
  }
}