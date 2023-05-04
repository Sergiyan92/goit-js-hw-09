import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

const inputDatatime = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const dayTime = document.querySelector('[data-days]');
const hoursTime = document.querySelector('[data-hours]');
const minutesTime = document.querySelector('[data-minutes]');
const secondsTime = document.querySelector('[data-seconds]');

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

    startBtn.addEventListener('click', () => {
      const timerInterval = setInterval(() => {
        const currentTime = new Date().getTime();
        const timeLeft = selectedDate.getTime() - currentTime; //
        console.log(timeLeft);
        function convertMs(ms) {
          // Number of milliseconds per unit of time
          const second = 1000;
          const minute = second * 60;
          const hour = minute * 60;
          const day = hour * 24;
          // Remaining days
          const days = Math.floor(ms / day);
          // Remaining hours
          const hours = Math.floor((ms % day) / hour);
          // Remaining minutes
          const minutes = Math.floor(((ms % day) % hour) / minute);
          // Remaining seconds
          const seconds = Math.floor((((ms % day) % hour) % minute) / second);
          dayTime.textContent = `${days}`;
          hoursTime.textContent = `${hours}`;
          minutesTime.textContent = `${minutes}`;
          secondsTime.textContent = `${seconds}`;
          if (timeLeft < 0) {
            clearInterval(timerInterval);
            dayTime.textContent = 00;
            hoursTime.textContent = 00;
            minutesTime.textContent = 00;
            secondsTime.textContent = 00;
          }
        }
        console.log(convertMs(timeLeft));
      }, 1000);
    });
  },
};
flatpickr(inputDatatime, options);
