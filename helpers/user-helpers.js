// modules
const fs = require('fs');

/******************************************************************************/
/**                           alter array of users                           **/
/******************************************************************************/

// sort array of users by user id
module.exports.sortUserArr = (arr) => {
  arr.sort((a, b) => (a.id > b.id ? 1 : -1));
  return arr;
};

// add user to array of users
module.exports.addUser = (arr, user) => {
  arr.push(user);
  return arr;
};

// delete user from array of users
module.exports.deleteUser = (arr, index) => {
  arr.splice(index, 1);
  return arr;
};

// replace user from array of users
module.exports.replaceUser = (arr, index, newUser) => {
  arr.splice(index, 1, newUser);
  return arr;
};

/******************************************************************************/
/**                       filter through array of users                      **/
/******************************************************************************/

// find user by id
module.exports.findUserById = (arr, value) => {
  return arr.filter((obj) => obj.id === value)[0];
};

// find user by display name
module.exports.findUserByDisplayName = (arr, value) => {
  return arr.filter((obj) => obj.display_name === value)[0];
};

// find index of user by id
module.exports.findUserIndexById = (arr, value) => {
  const index = arr.findIndex((obj) => obj.id === value);
  return index === -1 ? false : index;
};

module.exports.findUserIndexByDisplayName = (arr, value) => {
  const index = arr.findIndex((obj) => obj.display_name === value);
  return index === -1 ? false : index;
};

/******************************************************************************/
/**                                validation                                **/
/******************************************************************************/

// validate all users in array
module.exports.validateUserArr = (arr) => {
  // iterate through array
  let allIds = [];
  let allDisplayNames = [];
  for (let i = 0; i < arr.length; i++) {
    // check for invalid user obj
    if (!this.validateUser(arr[i])) {
      return false;
    }

    // check for duplicate id
    for (let j = 0; j < allIds.length; j++) {
      if (arr[i].id === allIds[j]) {
        return false;
      }
    }
    allIds.push(arr[i].id);

    // check for duplicate display names
    for (let j = 0; j < allDisplayNames.length; j++) {
      if (arr[i].display_name === allDisplayNames[j]) {
        return false;
      }
    }
    allDisplayNames.push(arr[i].display_name);
  }
  return true;
};

// validate request query
module.exports.validateQuery = (query) => {
  if (
    Array.isArray(query.id) ||
    Array.isArray(query.display_name) ||
    (query.id && query.display_name)
  ) {
    return false;
  } else {
    return true;
  }
};

// validate user object is complete + has correct types
module.exports.validateUserObj = (user) => {
  // type checking
  if (
    typeof user.id !== 'string' ||
    typeof user.login !== 'string' ||
    typeof user.display_name !== 'string' ||
    typeof user.type !== 'string' ||
    typeof user.broadcaster_type !== 'string' ||
    typeof user.description !== 'string' ||
    typeof user.profile_image_url !== 'string' ||
    typeof user.offline_image_url !== 'string' ||
    typeof user.created_at !== 'string' ||
    typeof user.original_json !== 'string'
  ) {
    return false;
  }
  return true;
};

// validate user request body is complete + has correct types
module.exports.validateUserReqBody = (reqBody) => {
  if (
    typeof reqBody.id !== 'string' ||
    typeof reqBody.login !== 'string' ||
    typeof reqBody.display_name !== 'string' ||
    typeof reqBody.type !== 'string' ||
    typeof reqBody.broadcaster_type !== 'string' ||
    typeof reqBody.description !== 'string' ||
    typeof reqBody.profile_image_url !== 'string' ||
    typeof reqBody.offline_image_url !== 'string' ||
    typeof reqBody.created_at !== 'string'
  ) {
    return false;
  }
  return true;
};

/******************************************************************************/
/**                                  checks                                  **/
/******************************************************************************/

// check if user shares unique properties with any existing users
module.exports.checkUniqUserProps = (arr, user) => {
  return (
    this.findUserById(arr, user.id) ||
    this.findUserByDisplayName(arr, user.display_name)
  );
};

/******************************************************************************/
/**                         write and read from file                         **/
/******************************************************************************/

// read json file + sort + return array of users
module.exports.readJsonFile = (file) => {
  const data = JSON.parse(fs.readFileSync(file, { encoding: 'utf8' }));
  return this.sortUserArr(data);
};

// sort array of users + write object to json file
module.exports.writeJsonFile = (file, data) => {
  data = this.sortUserArr(data);
  fs.writeFileSync(file, JSON.stringify(data));
};

/******************************************************************************/
/**                               user objects                               **/
/******************************************************************************/

// create user object from request body
module.exports.createUserObj = (reqBody) => {
  const { id, display_name, displayName } = reqBody;
  return {
    id: id,
    display_name: display_name.toLowerCase(),
    displayName: displayName,
  };
};

// update user object with partially complete request body
module.exports.updateUserObj = (exUser, reqBody) => {
  return {
    id: reqBody.id ? reqBody.id : exUser.id,
    display_name: reqBody.display_name
      ? reqBody.display_name
      : exUser.display_name,
    displayName: reqBody.displayName ? reqBody.displayName : exUser.displayName,
  };
};
