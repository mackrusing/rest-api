// helpers
const {
  getUserById,
  getUserByUsername,
  validateUser,
  checkForExistingUser,
  createUser,
  addUser,
  replaceUser,
  deleteUser,
  readJsonFile,
  modifyUser,
  writeJsonFile,
  filterArrByProperty,
  deleteObjByProperty,
} = require('./user-helpers');

// user json file location
const userFile = './users.json';

/******************************************************************************/
/**                              user handlers                               **/
/******************************************************************************/

module.exports.getReq = (req, res) => {
  // get json data
  const data = readJsonFile(userFile);

  // query parameters
  const { id, username } = req.query;

  if (id) {
    // find + return user by id
    const user = filterArrByProperty(data, 'id', id);
    return user
      ? res.status(200).send(user)
      : res.status(404).send({ message: 'user not found' });
  } else if (username) {
    // find + return user by username
    const user = filterArrByProperty(data, 'username', username);
    return user
      ? res.status(200).send(user)
      : res.status(404).send({ message: 'user not found' });
  } else {
    // return all users
    return res.status(200).send(data);
  }
};

module.exports.postReq = (req, res) => {
  // get json data
  const data = readJsonFile(userFile);

  // create user object
  const user = createUser(req.body);

  if (!validateUser(user)) {
    // invalid user object
    return res.status(418).send({ message: 'invalid user object' });
  } else if (
    filterArrByProperty(data, 'id', user.id) ||
    filterArrByProperty(data, 'username', user.username)
  ) {
    // user with this id or username already exists
    return res
      .status(409)
      .send({ message: 'user with this id or username already exists' });
  } else {
    // add user to file
    data.push(user);
    writeJsonFile(userFile, data);
    return res.status(204).send({});
  }
};

module.exports.putReq = (req, res) => {
  // get json data
  let data = readJsonFile(userFile);

  // get query parameters
  const { id, username } = req.query;

  // create user object
  const newUser = createUser(req.body);

  if (!validateUser(newUser)) {
    // invalid user object
    return res.status(418).send({ message: 'invalid user object' });
  }

  if (id) {
    // find + delete user by id then add new user
    const exUser = filterArrByProperty(data, 'id', id);
    if (exUser) {
      deleteObjByProperty(data, 'id', id);
      data.push(user);
      return res.status(204).send({});
    } else {
      return res.status(404).send({ message: 'user not found' });
    }
  } else if (username) {
    // find + delete user by username then add new user
    const user = filterArrByProperty(data, 'username', username);
    if (user) {
      deleteObjByProperty(data, 'username', username);
      data.push(user);
      return res.status(204).send({});
    } else {
      return res.status(404).send({ message: 'user not found' });
    }
  } else {
    const user = filterArrByProperty(data, 'id');
    if (filterArrByProperty(data, 'id', user.id)) {
    }
    // add user to file
    data.push(user);
    return res.status(204).send({});
  }

  if (!validateUser(user)) {
    // invalid user object
    return res.status(418).send({ message: 'invalid user object' });
  } else if (
    filterArrByProperty(data, 'id', user.id) ||
    filterArrByProperty(data, 'username', user.username)
  ) {
    // user with this id or username already exists
    deleteObjByProperty(data, 'id', user.id);
    data.push(user);
    return res.status(204).send({});
  } else {
    // add user to file
    data.push(user);
    return res.status(204).send({});
  }
};

module.exports.patchReq = (req, res) => {
  // get query parameters
  const { id, username } = req.query;

  if (id) {
    // get data from file
    const data = readJsonFile(userFile);

    // modify user by id
    const user = data.filter((user) => user.id === id)[0];

    //
    const newUser = {
      id: req.body.id ? req.body.id : user.id,
      username: req.body.username ? req.body.username : user.username,
      displayName: req.body.displayName
        ? req.body.displayName
        : user.displayName,
    };
    // remove old user obj
    data.filter((existingUser) => existingUser.id !== user.id);
    // add new user obj
    data.push(newUser);
    writeJsonFile(userFile, data);

    if (user) {
      modifyUser(userFile, user, req.body);
      return res.status(204).send({});
    } else {
      return res.status(404).send({ message: 'user not found' });
    }
  } else if (username) {
    // modify user by username
    const user = getUserByUsername(userFile, username);
    if (user) {
      modifyUser(userFile, user, req.body);
      return res.status(204).send({});
    } else {
      return res.status(404).send({ message: 'user not found' });
    }
  } else {
    return res.status(418).send({ message: 'no valid query provided' });
  }
};

module.exports.deleteReq = (req, res) => {
  // get json data
  let data = readJsonFile(userFile);

  // get query parameters
  const { id, username } = req.query;

  if (id) {
    // delete user by id
    const user = filterArrByProperty(data, 'id', id);
    if (user) {
      data = deleteObjByProperty(data, 'id', id);
      writeJsonFile(userFile, data);
      return res.status(204).send({});
    } else {
      return res.status(404).send({ message: 'user not found' });
    }
  } else if (username) {
    // delete user by username
    const user = filterArrByProperty(data, 'username', username);
    if (user) {
      data = deleteObjByProperty(data, 'username', username);
      writeJsonFile(userFile, data);
      return res.status(204).send({});
    } else {
      return res.status(404).send({ message: 'user not found' });
    }
  } else {
    return res.status(418).send({ message: 'no valid query provided' });
  }
};
