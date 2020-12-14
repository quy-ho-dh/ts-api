import * as path from "path";
import { createConnection, getConnection, getConnectionOptions } from "typeorm";

const TYPEORM_URL = process.env.TYPEORM_URL;
const TYPEORM_LOGGING = process.env.TYPEORM_LOGGING;

export const connectDB = async () => {
  const options = await getConnectionOptions();

  const matches = TYPEORM_URL!.match(/(?!.*\/)(.*)/);

  if (!matches || matches.length <= 1) {
    throw new Error(`invalid database URL ${TYPEORM_URL}`);
  }

  Object.assign(options, {
    type: "postgres",
    url: TYPEORM_URL,
    database: matches[1], // https://github.com/typeorm/typeorm/issues/2096
    synchronize: true,
    logging: TYPEORM_LOGGING,
    entities: [path.join(__dirname, "/models/*.{js,ts}")],
    cache: true,
  });

  return await createConnection(options);
};

export async function disconnectDatabase(): Promise<void> {
  return getConnection().close();
}
