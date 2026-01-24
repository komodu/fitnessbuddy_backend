const days = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

export const generateWeeklySchedule = (workoutTypeIds, restWorkoutTypeId) => {
  const schedule = {};

  days.forEach((day, index) => {
    schedule[day] = workoutTypeIds[index] || restWorkoutTypeId;
  });

  return schedule;
};
