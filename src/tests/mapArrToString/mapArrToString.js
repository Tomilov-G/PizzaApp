const mapArrToString = (arr) => {
  return arr
    .filter((item) => typeof item === "number")
    .map((num) => num.toString());
};

module.exports = mapArrToString