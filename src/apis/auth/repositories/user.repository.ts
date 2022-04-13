import User from "src/entities/user";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  public getUserById(id: string): Promise<User | undefined> {
    return this.createQueryBuilder()
      .where('unique_id = :id', { id })
      .getOne();
  }
}