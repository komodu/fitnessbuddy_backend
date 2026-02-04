const getWorkoutForDate = (date, template) => {
  const day = date
    .toLocaleDateString("en-US", { weekday: "long" })
    .toLowerCase();
  console.log(day);
  // Returns the Day and the Type within that Day
  return { exercises: template.weeklySchedule[day], day };
};

module.exports = getWorkoutForDate;
