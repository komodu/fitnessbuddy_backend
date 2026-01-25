const days = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

const generateWeeklySchedule = (workoutTypeIds, restWorkoutTypeId) => {
  const schedule = {};

  days.forEach((day, index) => {
    schedule[day] = workoutTypeIds[index] || restWorkoutTypeId;
  });
  console.log("sched: ", schedule);
  return schedule;
};

module.exports = generateWeeklySchedule;
