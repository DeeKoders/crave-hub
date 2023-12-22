const kleur = require("kleur");

module.exports = {
  logError: (message) => {
    console.log(kleur.red(message));
  },
  logInfo: (message) => {
    console.log(kleur.bold().yellow(message));
  },
};
