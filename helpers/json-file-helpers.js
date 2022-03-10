/******************************************************************************/
/**                                sort by id                                **/
/******************************************************************************/

const sortObjArrById = (arr) => {
  arr.sort((a, b) => (a.id > b.id ? 1 : -1));
  return arr;
};

/******************************************************************************/
/**                         write and read from file                         **/
/******************************************************************************/

// read json file + sort + return array of users
module.exports.readJsonFile = (file) => {
  const data = JSON.parse(fs.readFileSync(file, { encoding: 'utf8' }));
  return sortObjArrById(data);
};

// sort array of users + write object to json file
module.exports.writeJsonFile = (file, data) => {
  data = sortObjArrById(data);
  fs.writeFileSync(file, JSON.stringify(data));
};
