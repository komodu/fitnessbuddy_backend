const app = require("./app");
const connDB = require("./config/db");
// const express = require("express");
// const path = require("path");
// Connect to DB (MongoDB)
connDB();
// Serve frontend
// app.use(express.static(path.join(__dirname, "public")));

// Send index.html for all unknown routes
// app.get(/^\/(?!api).*/, (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });

app.listen(process.env.PORT, "0.0.0.0", () => {
  console.log("Server running on port " + process.env.PORT);
});
