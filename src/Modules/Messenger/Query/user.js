const queryUser = {
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

module.exports = queryUser;
