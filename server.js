const app = require("./app");
const connDB = require("./config/db");
// Connect to DB (MongoDB)
connDB();

app.listen(process.env.PORT, "0.0.0.0", () => {
  console.log("Server running on port " + process.env.PORT);
});
