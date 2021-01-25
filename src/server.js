const express = require("express");
const path = require("path");
const cors = require("cors");
const { ApolloServer } = require("apollo-server-express");
const { importSchema } = require("graphql-import");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

let users = {
  1: {
    id: "1",
    username: "Robin Wieruch",
  },
  2: {
    id: "2",
    username: "Dave Davids",
  },
};

const schema = importSchema(__dirname + "/graphql/schema.graphql").replace(
  "scalar Upload",
  ""
);

const resolvers = {
  // Query: {
  //   hello: (_, { name }) => `Hello ${name || "World"}`,
  // },
  Query: {
    users: () => {
      return Object.values(users);
    },

    user: (parent, { id }) => {
      return users[id];
    },

    me: (parent, args, { me }) => {
      return me;
    },
  },

  User: {
    username: (parent) => {
      return parent.username;
    },
  },
};

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: {
    me: users[1],
  },
  // playground: { endpoint: "/graphql", settings: { "editor.theme": "light" } },
});

const app = express();

app.use(cors("*"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

server.applyMiddleware({ app });

const port = process.env.PORT || 4000;
app.listen(port);
console.log(`Running a GraphQL API server at localhost:${port}/graphql`);
