import "dotenv/config";
import * as express from "express";
import UserController from "./controllers/UserController";
import { connectDB } from "./database";
import * as bodyParser from "body-parser";
import MessageController from "./controllers/MessageController";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port: Number = Number(process.env.PORT) || 8000;
const startServer = async () => {
  await app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
};

const initializeControllers = (controllers) => {
  controllers.forEach((controller) => {
    app.use("/", controller.router);
  });
};

(async () => {
  await connectDB();
  await startServer();
  initializeControllers([new UserController(), new MessageController()]);
})();
