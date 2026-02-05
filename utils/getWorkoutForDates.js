const getWorkoutForDate = (date, template) => {
  if (!template?.weeklySchedule) {
    throw new Error("Invalid workout template");
  }

  const day = date
    .toLocaleDateString("en-US", { weekday: "long" })
    .toLowerCase();

  const workoutForDay = template.weeklySchedule[day];
  console.log(workoutForDay);
  if (!workoutForDay) {
    return { day, workout: null };
  }

  return { day, workout: workoutForDay };
};

module.exports = getWorkoutForDate;
