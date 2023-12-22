const config = require("./config");
const app = require("./app.js");

const { logInfo } = require("./utils/logFunctions.js");
const port = config.get("port");

app.listen(port, () => {
  logInfo(`Server running on port: ${port}`);
});
