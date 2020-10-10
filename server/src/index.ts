import "reflect-metadata";

import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { MikroORM } from "@mikro-orm/core";
import session from "express-session";
import redis from "redis";
import connectRedis from "connect-redis";
import cors from "cors";

import { userResolver } from "./resolvers/userResolver";
import mikroOrmConfig from "./configs/mikro-orm.config";
import env from "./environment/env";

const bootstrap = async () => {
  const app = express();

  const mikro_orm = await MikroORM.init(mikroOrmConfig);
  await mikro_orm.getMigrator().up();

  const RedisStore = connectRedis(session);
  const redisClient = redis.createClient();

  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );

  app.use(
    session({
      name: "sid",
      store: new RedisStore({
        client: redisClient,
        disableTouch: true,
      }),
      secret: env.SECRET,
      saveUninitialized: false,
      resave: false,
      cookie: {
        sameSite: "lax", //csrf
        httpOnly: true,
        secure: env.PROD,
        maxAge: 1000 * 60 * 60 * 24 , // 1 day
      },
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [userResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({ em: mikro_orm.em, req, res }),
  });

  apolloServer.applyMiddleware({
    app,
    cors: false
  });

  app.listen(4000, () => {
    console.log("Server running at http://localhost:4000/graphql");
  });
};

bootstrap().catch((error) => console.log(error));
