// helpers
const {
  filterArrByProperty,
  deleteObjByProperty,
} = require('../helpers/helpers');
const {
  validateUser,
  createUser,
  updateUser,
} = require('../helpers/user-helpers');
const { readJsonFile, writeJsonFile } = require('../helpers/json-file-helpers');

// user json file location (relative to index file)
const userFile = './data/users.json';

/******************************************************************************/
/**                             simple handlers                              **/
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

  // create user object
  const newUser = createUser(req.body);

  if (!validateUser(newUser)) {
    // invalid user object
    console.log('invalid user');
    return res.status(418).send({ message: 'invalid user object' });
  }

  console.log('user validated');

  // find existing users with matching unique properties
  const exUserById = filterArrByProperty(data, 'id', newUser.id);
  const exUserByUsername = filterArrByProperty(
    data,
    'username',
    newUser.username
  );

  if (!exUserById && !exUserByUsername) {
    // no existing users with matching properties
    console.log('there are no users with this id or username');
    data.push(newUser);
    writeJsonFile(userFile, data);
    return res.status(204).send({});
  } else if (!exUserByUsername) {
    // username doesnt exist but id does so replace it
    console.log('this username doesnt exist but id does so replace it');
    data = deleteObjByProperty(data, 'id', newUser.id);
    data.push(newUser);
    writeJsonFile(userFile, data);
    return res.status(204).send({});
  } else if (!exUserById) {
    // id doesnt exist but username does (infered from prev logic)
    console.log('username is already used');
    return res.status(409).send({ message: 'username is already in use' });
  } else if (exUserById.id === exUserByUsername.id) {
    // username exists but is used by object with selected id object
    console.log(
      'username exists but is used by object with selected id object'
    );
    data = deleteObjByProperty(data, 'id', newUser.id);
    data.push(newUser);
    writeJsonFile(userFile, data);
    return res.status(204).send({});
  } else {
    // username is already used
    console.log('idk wtf happened tbh');
    return res.status(500).send({ message: 'idk wtf happened tbh' });
  }
};

module.exports.patchReq = (req, res) => {
  // get query parameters
  const { id, username } = req.query;

  // get data from file
  let data = readJsonFile(userFile);

  if (id) {
    // modify user by id
    const exUser = filterArrByProperty(data, 'id', id);

    // check for user
    if (!exUser) {
      return res.status(404).send({ message: 'user not found' });
    }

    // new user
    const newUser = updateUser(exUser, req.body);

    // remove old user obj
    data = deleteObjByProperty(data, 'id', id);
    data.push(newUser);
    writeJsonFile(userFile, data);
    return res.status(204).send({});
  } else if (username) {
    // modify user by username
    const exUser = filterArrByProperty(data, 'username', username);

    // check for user
    if (!exUser) {
      return res.status(404).send({ message: 'user not found' });
    }

    // new user
    const newUser = updateUser(exUser, req.body);

    // remove old user obj
    data = deleteObjByProperty(data, 'username', username);
    data.push(newUser);
    writeJsonFile(userFile, data);
    return res.status(204).send({});
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
