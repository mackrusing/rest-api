// helpers + modules
const {
  addUser,
  deleteUser,
  replaceUser,
  findUserById,
  findUserByUsername,
  findUserIndexById,
  findUserIndexByUsername,
  validateUserArr,
  validateQuery,
  validateUser,
  checkUniqUserProps,
  readJsonFile,
  writeJsonFile,
  createUserObj,
  updateUserObj,
} = require('../helpers/user-helpers');

// user json file location (relative to index file)
const userFile = './data/users.json';

/******************************************************************************/
/**                              error messages                              **/
/******************************************************************************/

// 404 errors
const notFoundErr = { message: 'user not found' };

// 409 errors
const exUniqPropErr = { message: 'this id and/or username already exists' };
const exUsernameErr = { message: 'this username already exists' };
const exIdErr = { message: 'this id already exists' };

// 418 errors
const invalidQueryErr = { message: 'invalid query' };
const invalidUserObjErr = { message: 'invalid user object' };

// 500 errors
const dataErr = { message: 'server error: invalid user data' };
const idkBadErr = { message: 'server error: something bad happened :(' };

/******************************************************************************/
/**                              simple handlers                             **/
/******************************************************************************/

module.exports.getReq = (req, res) => {
  // get json data
  const data = readJsonFile(userFile);

  // query parameters
  const { id, username } = req.query;

  // check for invalid query
  if (!validateQuery(req.query)) {
    return res.status(418).send(invalidQueryErr);
  }

  // find user by id
  if (id) {
    const user = findUserById(data, id);

    // user not found
    if (!user) {
      return res.status(404).send(notFoundErr);
    }

    // return user
    return res.status(200).send(user);
  }

  // find user by username
  if (username) {
    const user = findUserByUsername(data, username);

    // user not found
    if (!user) {
      return res.status(404).send(notFoundErr);
    }

    // return user
    return res.status(200).send(user);
  }

  // return all users
  return res.status(200).send(data);
};

/******************************************************************************/

module.exports.postReq = (req, res) => {
  // get json data
  let data = readJsonFile(userFile);

  // create user object
  const newUser = createUserObj(req.body);

  // check for invalid user object
  if (!validateUser(newUser)) {
    return res.status(418).send(invalidUserObjErr);
  }

  // check for existing id or username
  if (checkUniqUserProps(data, newUser)) {
    return res.status(409).send(exUniqPropErr);
  }

  // add user to data
  data = addUser(data, newUser);

  // write json and send response
  writeJsonFile(userFile, data);
  return res.status(204).send({});
};

/******************************************************************************/

module.exports.putReq = (req, res) => {
  // get json data
  let data = readJsonFile(userFile);

  // create user object
  const newUser = createUserObj(req.body);

  // check for invalid user object
  if (!validateUser(newUser)) {
    return res.status(418).send(invalidUserObjErr);
  }

  // find existing users with matching unique properties
  const exUserById = findUserById(data, newUser.id);
  const exUserByUsername = findUserByUsername(data, newUser.username);

  // id doesnt exist and username does - conflict error
  if (!exUserById && exUserByUsername) {
    return res.status(409).send(exUsernameErr);
  }

  // id and username don't exist - add new user
  if (!exUserById && !exUserByUsername) {
    // add user to data
    data = addUser(data, newUser);

    // write json and send response
    writeJsonFile(userFile, data);
    return res.status(204).send({});
  }

  // id exists and username doesn't - replace id
  if (exUserById && !exUserByUsername) {
    const userIndex = findUserIndexById(data, newUser.id);

    // replace user
    data = replaceUser(data, userIndex, newUser);

    // write json and send response
    writeJsonFile(userFile, data);
    return res.status(204).send({});
  }

  // id and username exist (implied) but are the same user obj - replace id
  if (exUserById.id === exUserByUsername.id) {
    const userIndex = findUserIndexById(data, newUser.id);

    // replace user
    data = replaceUser(data, userIndex, newUser);

    // write json and send response
    writeJsonFile(userFile, data);
    return res.status(204).send({});
  }

  // id and username exist but they aren't the same user obj (implied) - conflict error
  return res.status(409).send(exUsernameErr);
};

/******************************************************************************/

module.exports.patchReq = (req, res) => {
  // get json data
  let data = readJsonFile(userFile);

  // get query parameters
  const { id, username } = req.query;

  // check for invalid query
  if (!validateQuery(req.query)) {
    return res.status(418).send(invalidQueryErr);
  }

  // check for no query
  if (!id && !username) {
    return res.status(418).send(invalidQueryErr);
  }

  // modify user by id
  if (id) {
    const exUser = findUserById(data, id);
    const exUserIndex = findUserIndexById(data, id);

    // user not found
    if (!exUser) {
      return res.status(404).send(notFoundErr);
    }

    // create modified user and replace existing user
    const newUser = updateUserObj(exUser, req.body);
    data = replaceUser(data, exUserIndex, newUser);

    // write json and send response
    writeJsonFile(userFile, data);
    return res.status(204).send({});
  }

  // modify user by username
  if (username) {
    const exUser = findUserByUsername(data, username);
    const exUserIndex = findUserIndexByUsername(data, username);

    // user not found
    if (!exUser) {
      return res.status(404).send(notFoundErr);
    }

    // create modified user and replace existing user
    const newUser = updateUserObj(exUser, req.body);
    data = replaceUser(data, exUserIndex, newUser);

    // write json and send response
    writeJsonFile(userFile, data);
    return res.status(204).send({});
  }
};

/******************************************************************************/

module.exports.deleteReq = (req, res) => {
  // get json data
  let data = readJsonFile(userFile);

  // get query parameters
  const { id, username } = req.query;

  // check for invalid query
  if (!validateQuery(req.query)) {
    return res.status(418).send(invalidQueryErr);
  }

  // check for no query
  if (!id && !username) {
    return res.status(418).send(invalidQueryErr);
  }

  // delete user by id
  if (id) {
    const userIndex = findUserIndexById(data, id);

    // user not found
    if (!userIndex) {
      return res.status(404).send(notFoundErr);
    }

    // delete user
    data = deleteUser(data, userIndex);

    // write json and send response
    writeJsonFile(userFile, data);
    return res.status(204).send({});
  }

  // delete user by username
  if (username) {
    const userIndex = findUserIndexByUsername(data, username);

    // user not found
    if (!userIndex) {
      return res.status(404).send(notFoundErr);
    }

    // delete user
    data = deleteUser(data, userIndex);

    // write json and send response
    writeJsonFile(userFile, data);
    return res.status(204).send({});
  }
};
