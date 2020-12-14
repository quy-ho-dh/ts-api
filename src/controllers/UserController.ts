import { Request, Response, Router } from "express";
import { getManager } from "typeorm";
import { User } from "./../models/User";

export default class UserController {
  public path = "/users";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.get(`${this.path}`, this.getUsers);

    this.router.post(`${this.path}`, this.createUser);

    this.router.put(`${this.path}/:id`, this.updateUser);
  }

  private getUsers = async (_req: Request, res: Response) => {
    const userRepo = getManager().getRepository(User);
    const users = await userRepo.find();
    return res.json(users);
  };

  private async createUser(req: Request, res: Response) {
    const user = req.body as User;
    const userRepo = getManager().getRepository(User);
    try {
      const result = await userRepo.insert(new User({ ...user }));
      return res.json(result);
    } catch (err) {
      console.error(err);
      return res.status(500).json(err);
    }
  }

  private async updateUser(req: Request, res: Response) {
    const user = req.body as User;
    const userRepo = getManager().getRepository(User);
    try {
      const foundUser = await userRepo.findOne(req.params.id);
      if (!foundUser) {
        return res.status(404).json(new Error("User is not found."));
      }
      foundUser.firstName = user.firstName;
      foundUser.lastName = user.lastName;
      foundUser.age = user.age;
      const result = await userRepo.save(foundUser);
      return res.json(result);
    } catch (err) {
      console.error(err);
      return res.status(500).json(err);
    }
  }
}
