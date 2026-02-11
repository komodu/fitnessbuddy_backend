const days = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];
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

module.exports = getWorkoutForDays;
