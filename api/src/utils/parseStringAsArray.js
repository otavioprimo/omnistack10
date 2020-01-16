module.exports = parseStringAsArray = arrayAsString => {
  return arrayAsString.split(",").map(element => element.trim());
};
