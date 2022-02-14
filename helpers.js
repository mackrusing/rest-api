const fs = require('fs');

// find user object by id
const getUserById = (data, id) => {
  for (let i = 0; i < data.length; i++) {
    if (data[i].id === id) {
      return data[i];
    }
  }
  return 404;
};

// find user object by username
const getUserByUsername = (data, username) => {
  for (let i = 0; i < data.length; i++) {
    if (data[i].username === username) {
      return data[i];
    }
  }
  return 404;
};

// find index of user by id
const getIndexById = (data, id) => {
  for (let i = 0; i < data.length; i++) {
    if (data[i].id === id) {
      return i;
    }
  }
  return null;
};

// find index of user by username
const getIndexByUsername = (data, username) => {
  for (let i = 0; i < data.length; i++) {
    if (data[i].username === username) {
      return i;
    }
  }
  return null;
};

// write data
const writeUserData = (file, data) => {
  fs.writeFile(file, JSON.stringify(data), (err) => {
    if (err) throw err;
  });
};

// // write data
// module.exports.writetoFile = (file, data) => {
//   fs.writeFile(file, JSON.stringify(data), (err) => {
//     if (err) throw err;
//   });
// };

module.exports = {
  getUserById,
  getUserByUsername,
  getIndexById,
  getIndexByUsername,
  writeUserData,
};
