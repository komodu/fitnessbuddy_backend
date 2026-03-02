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
    schedule[day] = workoutTypeIds[day] || restWorkoutTypeId;
  });

  return schedule;
};

// Helper for Populating Template Model
const nestedPopulate = days.map((day) => ({
  path: `weeklySchedule.${day}`,
}));

const getWorkoutForDays = (template) => {
  if (!template?.weeklySchedule) {
    throw new Error("Invalid workout template");
  }

  days.map((day) => {
    template.weeklySchedule[day];
  });

  return days.map((day) => ({
    day,
    workout: template.weeklySchedule[day],
  }));
};

module.exports = {
  generateWeeklySchedule,
  getWorkoutForDays,
  days,
  nestedPopulate,
};
