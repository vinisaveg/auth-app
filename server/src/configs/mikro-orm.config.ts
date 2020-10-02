import { MikroORM } from "@mikro-orm/core";
import path from "path";

import { User } from "../entities/User";
import env from "../environment/env";

export default {
  dbName: "auth_app",
  type: "postgresql",
  user: "postgres",
  password: env.POSTGRES_PASS,
  entities: [User],
  migrations: {
    path: path.join(__dirname, "../migrations"),
    pattern: /^[\w-]+\d+\.[tj]s$/,
  },
  debug: !env.PROD,
} as Parameters<typeof MikroORM.init>[0];
