const isEmpty = require("lodash/isEmpty");
const compact = require("lodash/compact");

module.exports = async (req, res, next) => {
  try {
    const query = req.query;
    if (!isEmpty(query)) {
      for (const value in query) {
        if (query[value].includes(",")) {
          query[value] = compact(query[value].split(","));
        }
      }
    }
    next();
  } catch (error) {
    res
      .status(error.status || 500)
      .send(error.message || "Something went wrong!");
  }
};
