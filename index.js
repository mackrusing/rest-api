// require modules
const express = require('express');
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
} = require('./user-helpers');

// locarion of users json file
const userFile = './users.json';

// create instance of express
const app = express();

// middleware
app.use(express.json());

// get (read) users
app.get('/users', (req, res) => {
  // get query parameters
  const { id, username } = req.query;

  if (id) {
    // return user by id
    const user = getUserById(userFile, id);
    if (user) {
      res.status(200).send(user);
    } else {
      res.status(404).send({ message: 'user not found' });
    }
  } else if (username) {
    // return user by username
    const user = getUserByUsername(userFile, username);
    if (user) {
      res.status(200).send(user);
    } else {
      res.status(404).send({ message: 'user not found' });
    }
  } else {
    // return all data
    const users = readJsonFile(userFile);
    res.status(200).send(users);
  }
});

// post (create) user
app.post('/users', (req, res) => {
  // create user object
  const user = createUser(req.body);

  if (!validateUser(user)) {
    // invalid user object
    res.status(418).send({ message: 'invalid user object' });
  } else if (checkForExistingUser(userFile, user)) {
    // user with this id or username already exists
    res
      .status(409)
      .send({ message: 'user with this id or username already exists' });
  } else {
    // add user to file
    addUser(userFile, user);
    res.status(204).send({});
  }
});

// put (create / update) user
app.put('/users', (req, res) => {
  // create user object
  const user = createUser(req.body);

  if (!validateUser(user)) {
    // invalid user object
    res.status(418).send({ message: 'invalid user object' });
  } else if (checkForExistingUser(userFile, user)) {
    // user with this id or username already exists
    replaceUser(userFile, user);
    res.status(204).send({});
  } else {
    // add user to file
    addUser(userFile, user);
    res.status(204).send({});
  }
});

// patch (update) user
app.patch('/users', (req, res) => {
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
      res.status(204).send({});
    } else {
      res.status(404).send({ message: 'user not found' });
    }
  } else if (username) {
    // modify user by username
    const user = getUserByUsername(userFile, username);
    if (user) {
      modifyUser(userFile, user, req.body);
      res.status(204).send({});
    } else {
      res.status(404).send({ message: 'user not found' });
    }
  } else {
    res.status(418).send({ message: 'no valid query provided' });
  }
});

// delete user
app.delete('/users', (req, res) => {
  // get query parameters
  const { id, username } = req.query;

  if (id) {
    // delete user by id
    const user = getUserById(userFile, id);
    if (user) {
      deleteUser(userFile, user);
      res.status(204).send({});
    } else {
      res.status(404).send({ message: 'user not found' });
    }
  } else if (username) {
    // delete user by username
    const user = getUserByUsername(userFile, username);
    if (user) {
      deleteUser(userFile, user);
      res.status(204).send({});
    } else {
      res.status(404).send({ message: 'user not found' });
    }
  } else {
    res.status(418).send({ message: 'no valid query provided' });
  }
});

// listen for server connections
const port = 8080;

app.listen(port, () => {
  console.log(`listening for connections on http://localhost:${port}`);
});
