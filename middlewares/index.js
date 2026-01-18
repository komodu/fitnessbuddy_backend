// seed/index.js
require("dotenv").config();
const mongoose = require("mongoose");
const seedDays = require("./daySeed.js");
const seedworkoutType = require("./workoutTypeSeed.js");
// const seedRoles = require('./roleSeed'); // example for future seeds

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/yourdb";

async function runAllSeeds() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB for seeding");

    await seedDays();
    await seedworkoutType();
    // await seedRoles(); // call other seeders here
    console.log("All seeds completed");
  } catch (err) {
    console.error("Seeding error:", err);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
}

// Run if invoked directly
if (require.main === module) {
  runAllSeeds().then(() => process.exit());
}

module.exports = runAllSeeds;
