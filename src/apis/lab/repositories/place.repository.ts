import Place from "src/entities/place";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Place)
export class PlaceRepository extends Repository<Place> {
  public getLabs(): Promise<Place[]> {
    return this.createQueryBuilder()
      .orderBy('room', 'DESC')
      .getMany();
  }
}