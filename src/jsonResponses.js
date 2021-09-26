const users = {};

const respond = (request, response, status, object) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  response.writeHead(status, headers);
  response.write(JSON.stringify(object));
  response.end();
};

const respondMeta = (request, response, status) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  response.writeHead(status, headers);
  response.end();
};

// Gets all users in the user object
const getUsers = (request, response) => {
  const responseJSON = {
    users,
  };

  return respond(request, response, 200, responseJSON);
};

// Gets all users in the user object as meta data
const getUsersMeta = (request, response) => respondMeta(request, response, 200);

// Updates the user object with a new user
const updateUser = (request, response) => {
  const newUser = {
    createdAt: Date.now(),
  };

  users[newUser.createAt] = newUser;

  return respond(request, response, 201, newUser);
};

// Adds user to the user oject given user input in the html form
const addUser = (request, response, body) => {
  const responseJSON = {
    message: 'Name and age are both required',
  };

  if (!body.name || !body.age) {
    responseJSON.id = 'missingParams';
    return respond(request, response, 400, responseJSON);
  }

  let responseCode = 201;

  if (users[body.name]) {
    // User exists and is updated
    responseCode = 204;
  } else {
    users[body.name] = {};
    users[body.name].name = body.name;
  }

  users[body.name].age = body.age;

  if (responseCode === 201) {
    responseJSON.message = 'Created Successfully';
    return respond(request, response, responseCode, responseJSON);
  }

  return respondMeta(request, response, responseCode);
};

const notFound = (request, response) => {
  const responseJSON = {
    message: 'Page you are looking for was not found',
    id: 'notFound',
  };
  return respond(request, response, 404, responseJSON);
};

const notFoundMeta = (request, response) => respond(request, response, 404);

module.exports = {
  getUsers,
  getUsersMeta,
  updateUser,
  addUser,
  notFound,
  notFoundMeta,
};
