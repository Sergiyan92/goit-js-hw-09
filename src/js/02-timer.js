import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

const inputDatatime = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate.getTime() <= Date.now()) {
      window.alert('Please choose a date in the future');
      startBtn.disabled = true;
      return;
    }
    startBtn.disabled = false;
  },
};
flatpickr(inputDatatime, options);

startBtn.addEventListener('click', e => {
  const selectedDate = flatpickr.parseDate(inputDatatime.value);

  intervalId = setInterval(function () {
    const timeDiff = selectedDate.getTime() - Date.now();
    const secondsDiff = Math.floor(timeDiff / 1000);
    console.log(`${secondsDiff} seconds left`);
  }, 1000);
});
