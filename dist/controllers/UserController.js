"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const typeorm_1 = require("typeorm");
const User_1 = require("./../models/User");
class UserController {
    constructor() {
        this.path = "/users";
        this.router = express.Router();
        this.getUsers = async (_req, res) => {
            const userRepo = typeorm_1.getManager().getRepository(User_1.User);
            const users = await userRepo.find();
            return res.json(users);
        };
        this.createUser = async (req, res) => {
            const user = req.body;
            const userRepo = typeorm_1.getManager().getRepository(User_1.User);
            try {
                const result = await userRepo.insert(new User_1.User({ ...user }));
                return res.json(result);
            }
            catch (err) {
                console.error(err);
                return res.status(500).json(err);
            }
        };
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}`, this.getUsers);
        this.router.post(`${this.path}`, this.createUser);
    }
}
exports.default = UserController;
//# sourceMappingURL=UserController.js.map