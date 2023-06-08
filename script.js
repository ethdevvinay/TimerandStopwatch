var timerInterval;
var stopwatchInterval;

var timerHoursInput = document.getElementById("hoursInput");
var timerMinutesInput = document.getElementById("minutesInput");
var timerSecondsInput = document.getElementById("secondsInput");

var stopwatchHoursSpan = document.getElementById("stopwatchHours");
var stopwatchMinutesSpan = document.getElementById("stopwatchMinutes");
var stopwatchSecondsSpan = document.getElementById("stopwatchSeconds");
var stopwatchMillisecondsSpan = document.getElementById("stopwatchMilliseconds");

var startTimerBtn = document.getElementById("startTimerBtn");
var resetTimerBtn = document.getElementById("resetTimerBtn");

var startStopwatchBtn = document.getElementById("startStopwatchBtn");
var resetStopwatchBtn = document.getElementById("resetStopwatchBtn");

startTimerBtn.addEventListener("click", startTimer);
resetTimerBtn.addEventListener("click", resetTimer);

startStopwatchBtn.addEventListener("click", startStopwatch);
resetStopwatchBtn.addEventListener("click", resetStopwatch);

function startTimer() {
  var hours = parseInt(timerHoursInput.value) || 0;
  var minutes = parseInt(timerMinutesInput.value) || 0;
  var seconds = parseInt(timerSecondsInput.value) || 0;

  var totalSeconds = hours * 3600 + minutes * 60 + seconds;

  if (totalSeconds <= 0) {
    return;
  }

  disableTimerInputs();

  timerInterval = setInterval(function() {
    if (totalSeconds <= 0) {
      clearInterval(timerInterval);
      enableTimerInputs();
      return;
    }

    hours = Math.floor(totalSeconds / 3600);
    minutes = Math.floor((totalSeconds % 3600) / 60);
    seconds = totalSeconds % 60;

    updateTimer(hours, minutes, seconds);
    totalSeconds--;
  }, 1000);
}

function resetTimer() {
  clearInterval(timerInterval);
  enableTimerInputs();
  updateTimer(0, 0, 0);
}

function updateTimer(hours, minutes, seconds) {
  timerHoursInput.value = formatTime(hours);
  timerMinutesInput.value = formatTime(minutes);
  timerSecondsInput.value = formatTime(seconds);
}

function disableTimerInputs() {
  timerHoursInput.disabled = true;
  timerMinutesInput.disabled = true;
  timerSecondsInput.disabled = true;
  startTimerBtn.disabled = true;
}

function enableTimerInputs() {
  timerHoursInput.disabled = false;
  timerMinutesInput.disabled = false;
  timerSecondsInput.disabled = false;
  startTimerBtn.disabled = false;
}

function startStopwatch() {
  var hours = parseInt(stopwatchHoursSpan.textContent);
  var minutes = parseInt(stopwatchMinutesSpan.textContent);
  var seconds = parseInt(stopwatchSecondsSpan.textContent);
  var milliseconds = parseInt(stopwatchMillisecondsSpan.textContent);

  disableStopwatchBtns();

  stopwatchInterval = setInterval(function() {
    milliseconds += 10;
    if (milliseconds === 1000) {
      milliseconds = 0;
      seconds++;
    }
    if (seconds === 60) {
      seconds = 0;
      minutes++;
    }
    if (minutes === 60) {
      minutes = 0;
      hours++;
    }

    updateStopwatch(hours, minutes, seconds, milliseconds);
  }, 10);
}

function resetStopwatch() {
  clearInterval(stopwatchInterval);
  enableStopwatchBtns();
  updateStopwatch(0, 0, 0, 0);
}

function updateStopwatch(hours, minutes, seconds, milliseconds) {
  stopwatchHoursSpan.textContent = formatTime(hours);
  stopwatchMinutesSpan.textContent = formatTime(minutes);
  stopwatchSecondsSpan.textContent = formatTime(seconds);
  stopwatchMillisecondsSpan.textContent = formatTime(milliseconds, 3);
}

function disableStopwatchBtns() {
  startStopwatchBtn.disabled = true;
  resetStopwatchBtn.disabled = true;
}

function enableStopwatchBtns() {
  startStopwatchBtn.disabled = false;
  resetStopwatchBtn.disabled = false;
}

function formatTime(time, digits) {
  digits = digits || 2;
  return time.toString().padStart(digits, "0");
}
