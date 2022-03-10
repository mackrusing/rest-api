/******************************************************************************/
/**                          alter array of objects                          **/
/******************************************************************************/

// add object to array of objects
module.exports.addObj = (arr, user) => {
  arr.push(user);
  return arr;
};

// remove object from array of objects
module.exports.removeObj = (arr, index) => {
  arr.splice(index, 1);
  return arr;
};

// replace object from array of objects
module.exports.replaceObj = (arr, index, newUser) => {
  arr.splice(index, 1, newUser);
  return arr;
};
