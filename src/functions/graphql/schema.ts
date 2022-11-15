import { buildSchemaSync } from 'type-graphql';
import {
  LoginResolver,
  DocumentResolver
} from './resolvers';

const schema = buildSchemaSync({
  resolvers: [ 
    LoginResolver,
    DocumentResolver
  ],
  // emitSchemaFile:
  //   process.env.NODE_ENV === 'development'
  //     ? { path: __dirname + '/types/schema.gql' }
  //     : false,
});

export { schema };
