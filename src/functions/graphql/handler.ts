import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-lambda';
import { schema } from './schema';
import * as db from '../config/connection';
import * as models from '../graphql/types';

// import { context } from './context';
// Habilitar cuando se desee crear nuevas tablas.
db.sqlz.addModels(Object.values(models));
// db.init();

const server = new ApolloServer({
  // typeDefs,
  // resolvers,
  schema: schema,
  context: async (request) => {
    // return context(request, db.sqlz);
    return "something"
  },
});

export const main = server.createHandler({
  expressGetMiddlewareOptions: {
    cors: {
      origin: '*',
      credentials: true,
    },
  },
});