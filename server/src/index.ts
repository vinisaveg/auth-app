import "reflect-metadata";

import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { MikroORM } from "@mikro-orm/core";

import { userResolver } from "./resolvers/userResolver";
import mikroOrmConfig from "./configs/mikro-orm.config";

const bootstrap = async () => {
  const app = express();

  const mikro_orm = await MikroORM.init(mikroOrmConfig);
  await mikro_orm.getMigrator().up();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [userResolver],
    }),
    context: ({ req, res }) => ({ em: mikro_orm.em, req, res }),
  });

  apolloServer.applyMiddleware({
    app,
  });

  app.listen(4000, () => {
    console.log("Server running at http://localhost:4000/graphql");
  });
};

bootstrap().catch((error) => console.log(error));
