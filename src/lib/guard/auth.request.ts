import User from "src/entities/user";

export default class AuthRequest extends Request {
  user: User;
}