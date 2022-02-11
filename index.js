// require modules
const { groupEnd } = require('console');
const express = require('express');
const fs = require('fs');
const {
  getUserById,
  getUserByUsername,
  getIndexById,
  getIndexByUsername,
  writeUserData,
} = require('./helpers');

// app data
const appData = require('./users');

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
    const user = getUserById(appData, parseInt(id));
    if (user !== 400) {
      res.status(200).send(user);
    } else {
      res.status(404).send({ message: 'user not found' });
    }
  } else if (username) {
    // return user by username
    const user = getUserByUsername(appData, username);
    if (user !== 400) {
      res.status(200).send(user);
    } else {
      res.status(404).send({ message: 'user not found' });
    }
  } else {
    // return all data
    res.status(200).send(appData);
  }
});

// post (create) user
app.post('/users', (req, res) => {
  // get new user properties
  const { id, username, firstName, lastName } = req.body;

  if (!id || !username || !firstName || !lastName) {
    // check for valid user object
    res.status(418).send({ message: 'not all required properties provided' });
  } else if (
    getUserById(appData, id) !== 404 ||
    getUserByUsername(appData, username) !== 404
  ) {
    // check for existing user
    res.status(409).send({ message: 'user already exists' });
  } else {
    // create new user
    const user = {
      id: id,
      username: username,
      firstName: firstName,
      lastName: lastName,
    };
    appData.push(user);
    writeUserData('users.json', appData);
    res.status(204).send({});
  }
});

// delete user
app.delete('/users', (req, res) => {
  // get query parameters
  const { id, username } = req.query;

  if (id) {
    // delete user by id
    const userIndex = getIndexById(appData, parseInt(id));
    if (userIndex) {
      appData.splice(userIndex, 1);
      writeUserData('users.json', appData);
      res.status(204).send({});
    } else {
      res.status(404).send({ message: 'user not found' });
    }
  } else if (username) {
    // delete user by username
    const userIndex = getIndexByUsername(appData, username);
    if (userIndex) {
      appData.splice(userIndex, 1);
      writeUserData('users.json', appData);
      res.status(204).send({});
    } else {
      res.status(404).send({ message: 'user not found' });
    }
  } else {
    res.status(418).send({ message: 'no query provided' });
  }
});

// listen for server connections
const port = 8080;

app.listen(port, () => {
  console.log(`listening for connections on http://localhost:${port}`);
});
