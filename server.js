const app = require("./app")
const connDB = require("./config/db")
// Connect to DB (MongoDB)
connDB();


app.listen(process.env.PORT, () =>{
    console.log("Server running on port " + process.env.PORT);
});