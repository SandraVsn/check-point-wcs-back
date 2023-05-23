import 'reflect-metadata';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import http from 'http';
import { buildSchema } from 'type-graphql';
import { CountryResolver } from './resolvers/CountryResolver';
import { dataSource } from './db';

const start = async (): Promise<void> => {
  dataSource
    .initialize()
    .then(() => {
      // here you can start to work with your database
    })
    .catch((error) => console.log(error));
  const app = express();
  const httpServer = http.createServer(app);

  const schema = await buildSchema({
    resolvers: [CountryResolver],
  });

  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
  });

  await server.start();

  app.use(
    ['/'],
    express.json(),
    expressMiddleware(server, {
      context: async ({ req, res }) => ({ req, res }),
    })
  );

  httpServer.listen(4000, () =>
    console.log(`🚀 Server ready at http://localhost:4000`)
  );
};

start().catch(console.error);
