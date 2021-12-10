const mysql = require("mysql");
const core = require("@actions/core");

try {
  var con = mysql.createConnection({
    host: core.getInput("host"),
    user: core.getInput("user"),
    password: core.getInput("password"),
  });
  con.connect();
  con.query(
    `DROP DATABASE IF EXISTS ` + core.getInput("database-name"),
    function (err, result) {
      if (err) {
        core.setFailed(err);
      }
    }
  );
  con.end();
  core.setOutput("status", "ok");
} catch (error) {
  core.setFailed(error.message);
}
