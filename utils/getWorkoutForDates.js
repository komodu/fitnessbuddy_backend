export const getWorkoutForDate = (date, template) => {
  const day = date
    .toLocaleDateString("en-US", { weekday: "long" })
    .toLowerCase();

  return template.weeklySchedule[day];
};
