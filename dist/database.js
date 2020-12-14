"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnectDatabase = exports.connectDB = void 0;
const path = require("path");
const typeorm_1 = require("typeorm");
const TYPEORM_URL = process.env.TYPEORM_URL;
const TYPEORM_LOGGING = process.env.TYPEORM_LOGGING;
exports.connectDB = async () => {
    const options = await typeorm_1.getConnectionOptions();
    const matches = TYPEORM_URL.match(/(?!.*\/)(.*)/);
    if (!matches || matches.length <= 1) {
        throw new Error(`invalid database URL ${TYPEORM_URL}`);
    }
    Object.assign(options, {
        type: "postgres",
        url: TYPEORM_URL,
        database: matches[1],
        synchronize: true,
        logging: TYPEORM_LOGGING,
        entities: [path.join(__dirname, "/models/*.{js,ts}")],
        cache: true,
    });
    return await typeorm_1.createConnection(options);
};
async function disconnectDatabase() {
    return typeorm_1.getConnection().close();
}
exports.disconnectDatabase = disconnectDatabase;
//# sourceMappingURL=database.js.map