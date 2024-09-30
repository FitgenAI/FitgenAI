document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('timetable-form');
  const resultDiv = document.getElementById('timetable-result');
  const timetableList = document.getElementById('timetable-list');

  form.addEventListener('submit', function(event) {
      event.preventDefault();

      const goal = document.getElementById('fitness-goal').value;
      const daysPerWeek = parseInt(document.getElementById('days-per-week').value, 10);
      const duration = parseInt(document.getElementById('workout-duration').value, 10);

      const exercises = {
          'lose-weight': ['Cardio', 'HIIT', 'Bodyweight Exercises'],
          'build-muscle': ['Strength Training', 'Weight Lifting', 'Resistance Bands'],
          'improve-endurance': ['Running', 'Cycling', 'Swimming']
      };

      const selectedExercises = exercises[goal];
      const timetable = [];

      for (let i = 0; i < daysPerWeek; i++) {
          const exercise = selectedExercises[i % selectedExercises.length];
          timetable.push(`Day ${i + 1}: ${exercise} for ${duration} minutes`);
      }

      timetableList.innerHTML = timetable.map(item => `<li>${item}</li>`).join('');
      resultDiv.style.display = 'block';
  });
});
