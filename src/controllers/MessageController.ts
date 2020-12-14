import { Request, Response, Router } from "express";
import { getManager } from "typeorm";
import { Message } from "./../models/Message";

export default class MessageController {
  public path = "/messages";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.get(`${this.path}`, this.getMessages);

    this.router.post(`${this.path}`, this.createMessage);
  }

  private getMessages = async (_req: Request, res: Response) => {
    const messageRepo = getManager().getRepository(Message);
    const messages = await messageRepo.find({
      relations: ["sender", "receiver"],
    });
    return res.json(messages);
  };

  private async createMessage(req: Request, res: Response) {
    const message = req.body as Message;
    const messageRepo = getManager().getRepository(Message);
    try {
      const createdMessage = await messageRepo.insert(
        new Message({ ...message })
      );
      return res.json(createdMessage);
    } catch (err) {
      console.error(err);
      return res.status(500).json(err);
    }
  }
}
