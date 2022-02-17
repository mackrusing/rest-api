// create user object from request body
module.exports.createUser = (reqBody) => {
  const { id, username, displayName } = reqBody;
  return {
    id: id,
    username: username,
    displayName: displayName,
  };
};

// validate user object is complete + has correct types
module.exports.validateUser = (user) => {
  if (
    Object.keys(user).length === 3 &&
    typeof user.id === 'string' &&
    typeof user.username === 'string' &&
    typeof user.displayName === 'string'
  ) {
    return true;
  } else {
    return false;
  }
};

// update user with partially complete object
module.exports.updateUser = (exUser, reqBody) => {
  return {
    id: reqBody.id ? reqBody.id : exUser.id,
    username: reqBody.username ? reqBody.username : exUser.username,
    displayName: reqBody.displayName ? reqBody.displayName : exUser.displayName,
  };
};
