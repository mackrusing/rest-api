// modules
const fs = require('fs');

/******************************************************************************/
/**             filter through array of users by unique property             **/
/******************************************************************************/

// find user by id
module.exports.findUserById = (arr, idQuery) => {
  return arr.filter((obj) => obj.id === idQuery)[0];
};

// find user by login
module.exports.findUserByLogin = (arr, loginQuery) => {
  return arr.filter((obj) => obj.login === loginQuery)[0];
};

// find index of user by id
module.exports.findUserIndexById = (arr, idQuery) => {
  const index = arr.findIndex((obj) => obj.id === idQuery);
  return index === -1 ? false : index;
};

module.exports.findUserIndexByLogin = (arr, loginQuery) => {
  const index = arr.findIndex((obj) => obj.login === loginQuery);
  return index === -1 ? false : index;
};

/******************************************************************************/
/**                                validation                                **/
/******************************************************************************/

// validate request query for selecting a single user
module.exports.validateSelectQuery = (query) => {
  if (
    Array.isArray(query.id) ||
    Array.isArray(query.login) ||
    (query.id && query.login)
  ) {
    return false;
  }

  // else valid query
  return true;
};

// validate user object is complete + has correct types
module.exports.validateUserObj = (user) => {
  // obj length check
  if (Object.keys(obj).length !== 10) {
    return false;
  }

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

  // else valid object
  return true;
};

// validate user request body has required values + has correct types
module.exports.validateUserReqBody = (reqBody) => {
  // type check
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

  // else valid request
  return true;
};

/******************************************************************************/
/**                                  checks                                  **/
/******************************************************************************/

// check if user shares unique properties with any existing users
module.exports.checkUniqUserProps = (arr, user) => {
  return (
    this.findUserById(arr, user.id) || this.findUserByLogin(arr, user.login)
  );
};

/******************************************************************************/
/**                               user objects                               **/
/******************************************************************************/

// create user object from request body
module.exports.createUserObj = (reqBody) => {
  const { id, login, display_name } = reqBody;
  return {
    id: id,
    login: login,
    display_name: display_name,
  };
};

// update user object with partially complete request body
module.exports.updateUserObj = (exUser, reqBody) => {
  return {
    id: reqBody.id ? reqBody.id : exUser.id,
    login: reqBody.login ? reqBody.login : exUser.login,
    display_name: reqBody.display_name
      ? reqBody.display_name
      : exUser.display_name,
  };
};
