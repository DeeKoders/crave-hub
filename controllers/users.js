const { isArray, isEmpty } = require("lodash");
const { logError } = require("../utils/logFunctions");
const userServices = require("../services/users");

module.exports = {
  registration: async (req, res) => {
    try {
      const { firstName, lastName, mobileNumber, password } = req.body;

      const registrationResult = await userServices.registration({
        firstName,
        lastName,
        mobileNumber,
        address,
        password,
      });

      if (registrationResult.success) {
        res.status(200).send({ message: "Registration successful" });
      } else {
        res.status(400).send({ message: registrationResult.error });
      }
    } catch (error) {
      logError(`Error occured in getAllProducts controller: ${error.message}`);
      res.status(400).send({ message: registrationResult.error });
    }
  },

  login: async (req, res) => {
    try {
      const loginResult = await userServices.login(req.body);

      if (loginResult.success) {
        res.status(200).send({
          message: "Login successful",
          user: loginResult.user,
          token: loginResult.token,
        });
      } else {
        res.status(401).send({ message: loginResult.error });
      }
    } catch (error) {
      logError(`Error occurred in login controller: ${error.message}`);
      res.status(500).send({ message: "Login failed" });
    }
  },
};
