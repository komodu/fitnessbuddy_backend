// seed/daySeed.js
const Day = require('../models/dayModel.js');

const days = [
  { day: 'Monday' },
  { day: 'Tuesday' },
  { day: 'Wednesday' },
  { day: 'Thursday' },
  { day: 'Friday' },
  { day: 'Saturday' },
  { day: 'Sunday' },
];

async function seedDays() {
  // Do NOT connect/disconnect here when using centralized seeding
  // Just perform DB operations assuming mongoose is already connected.
  try {
    // Optionally use upsert/avoid duplicates instead of deleteMany in prod
    await Day.deleteMany();
    await Day.insertMany(days);
    console.log('Days seeded successfully');
  } catch (err) {
    console.error('Day seeding failed:', err);
    throw err; // bubble up so central seeder knows it failed
  }
}

module.exports = seedDays;
