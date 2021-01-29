const express = require("express");
const path = require("path");
const cors = require("cors");
const { ApolloServer } = require("apollo-server-express");
const { importSchema } = require("graphql-import");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

// const { getPartner } = require("./graphql/models/Codes");
// const { getNav } = require("./graphql/models/Codew");

const { navigation, partNav, partner, level } = require("./graphql/query");

const { users, messages } = require("./Modules/Messenger/Model/_dummy");
// const { queryUser } = require("./Modules/Messenger/Query/user");
const schema = importSchema(__dirname + "/graphql/schema.graphql").replace(
  "scalar Upload",
  ""
);

// navigation().then(console.log);
// partNav().then(console.log);

// console.log(navigation());
// console.log(getLevel);

const resolvers = {
  // Query: {
  //   hello: (_, { name }) => `Hello ${name || "World"}`,
  // },
  Query: {
    // getPartner,
    navigation,
    users: () => {
      return Object.values(users);
    },
    user: (parent, { id }) => {
      return users[id];
    },
    me: (parent, args, { me }) => {
      return me;
    },

    messages: () => {
      return Object.values(messages);
    },
    message: (parent, { id }) => {
      return messages[id];
    },
  },

  User: {
    messages: (user) => {
      return Object.values(messages).filter(
        (message) => message.id === user.id
      );
    },
  },

  Message: {
    user: (message) => {
      return users[message.userId];
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
