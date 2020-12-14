"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express = require("express");
const UserController_1 = require("./controllers/UserController");
const database_1 = require("./database");
const app = express();
const port = Number(process.env.PORT) || 8000;
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
    await database_1.connectDB();
    await startServer();
    initializeControllers([new UserController_1.default()]);
})();
//# sourceMappingURL=index.js.map