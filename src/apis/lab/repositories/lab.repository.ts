import Place from "src/entities/place";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Place)
export class LabRepository extends Repository<Place> {
  public getLabs(): Promise<Place[]> {
    return this.createQueryBuilder()
      .orderBy('room', 'DESC')
      .getMany();
  }
}