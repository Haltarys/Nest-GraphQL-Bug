const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
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
`;

const resolvers = {
  Query: {
    createUserA: (_, { input }) => {
      console.log(input.age);
      return false;
    },

    createUserB: (_, { input }) => {
      console.log(input.age);
      return false;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
