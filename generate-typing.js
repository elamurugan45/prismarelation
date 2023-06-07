const { GraphQLDefinitionsFactory } = require('@nestjs/graphql');
const { join } = require('path');
const definitionsFactory = new GraphQLDefinitionsFactory();
definitionsFactory.generate({
  typePaths: ['src/*.gql'],
  path: join('C:/Users/91994/frotendtask/src/graphql.ts'),
  outputAs: 'class',
  watch: false,
  skipResolverArgs: true,
});