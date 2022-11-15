import type { AWS } from '@serverless/typescript';

import hello from '@functions/hello';
import graphql from '@functions/graphql';

const serverlessConfiguration: AWS = {
  service: 'sls-aws-todo-list',
  frameworkVersion: '3',
  plugins: [
    // 'serverless-esbuild',
    'serverless-webpack',
    'serverless-offline',
  ],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
  },
  functions: { 
    hello,
    graphql
  },
  package: { individually: true },
  custom: {
    webpack: {
      webpackConfig: 'webpack.config.js',
      includeModules: {
        forceInclude: ['mysql2', 'sequelize-typescript'],
      },
    },
    // 'serverless-offline': {
    //   httpPort: 8080
    // }
  },
};

module.exports = serverlessConfiguration;
