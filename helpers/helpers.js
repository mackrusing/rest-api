// filter array of objects by object property
module.exports.filterArrByProperty = (arr, property, value) => {
  let filteredArr = arr.filter((obj) => obj[property] === value);
  return filteredArr.length ? filteredArr[0] : null;
};

// remove object from array by object peoperty
module.exports.deleteObjByProperty = (arr, property, value) => {
  return arr.filter((obj) => obj[property] !== value);
};
