const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  input A {
    age: Int! = 42
  }

  input B {
    age: Int = 42
  }

  type Query {
    createUserA(input: A!): Boolean
    createUserB(input: B!): Boolean
  }
`);

// The root provides a resolver function for each API endpoint
const root = {
  createUserA: ({ input }) => {
    console.log(input.age);
    return false;
  },

  createUserB: ({ input }) => {
    console.log(input.age);
    return false;
  },
};

const app = express();
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  }),
);
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');
