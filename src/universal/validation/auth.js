const name = { presence: true };
const firstname = { presence: true };
const username = {
  presence: true,
  length: {
    minimum: 6,
    message: "must be at least 6 characters"
  }
};
const password = {
  presence: true,
  length: {
    minimum: 8,
    message: "must be at least 8 characters"
  }
};

export const registerConstraints = {
  server: {
    firstname,
    username,
    password
  },
  client: {
    name,
    username,
    password
  }
};

export const loginConstraints = {
  client: {
    username,
    password
  }
};

export const profileConstraints = {
  server: {
    firstname,
    username
  },
  client: {
    name,
    username
  }
};
