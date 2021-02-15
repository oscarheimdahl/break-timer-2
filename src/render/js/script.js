const { ipcRenderer } = require('electron');

document.body.addEventListener('click', hideAlarm, true);
const pauseIcon = document.getElementById('pause');
const playIcon = document.getElementById('play');
const toggleTimer = document.getElementById('toggle-timer');
const setTime1 = document.getElementById('setTime1');
const setTime2 = document.getElementById('setTime2');
const customTime = document.getElementById('custom');
const shownMinute = document.getElementById('minute');
const shownSecond = document.getElementById('second');
let secondsToAlarm;
let ticking = false;
let alarm = false;
let ticker;
let alarmBlinker;
let soundOn = true;

const defaultTime = 60 * 25;

shownMinute.innerText = pad0(Math.floor(defaultTime / 60));
shownSecond.innerText = pad0(defaultTime % 60);

setTime1.addEventListener('click', () => onButtonClick(setTime1));
setTime2.addEventListener('click', () => onButtonClick(setTime2));
setTime1.onwheel = (e) => onButtonScroll(e, setTime1);
setTime2.onwheel = (e) => onButtonScroll(e, setTime2);

function onButtonClick(button) {
  secondsToAlarm = parseInt(button.innerText) * 60;
  updateShownTime();
}

function onButtonScroll(e, button) {
  const up = e.deltaY < 0;
  const delta = up ? 1 : -1;
  const newValue = parseInt(button.innerText) + delta;
  if (newValue > 0 && newValue < 100) button.innerText = newValue;
}

toggleTimer.addEventListener('click', (e) => {
  ticking = !ticking;
  toggleIcon();
  if (!ticker) startTimer();
  if (!secondsToAlarm) secondsToAlarm = defaultTime;
  updateShownTime();
  hideAlarm();
});

function startTimer() {
  ticker = setInterval(() => {
    if (ticking) tick();
  }, 1000);
}

function tick() {
  secondsToAlarm--;
  if (secondsToAlarm < 0) ringAlarm();
  updateShownTime();
}

function ringAlarm() {
  playSound();
  secondsToAlarm = 0;
  alarm = true;
  ticking = false;
  clearInterval(ticker);
  ticker = null;
  toggleIcon();
  showAlarm();
}

function playSound() {
  if (soundOn) {
    const sound = document.getElementById('sound');
    sound.volume = 0.5;
    sound.play();
  }
}

function showAlarm() {
  shownSecond.style.color = 'crimson';
  shownMinute.style.color = 'crimson';
  alarmBlinker = setInterval(() => {
    if (shownSecond.style.color === 'white') {
      shownSecond.style.color = 'crimson';
      shownMinute.style.color = 'crimson';
    } else {
      shownSecond.style.color = 'white';
      shownMinute.style.color = 'white';
    }
  }, 1000);
}

function hideAlarm() {
  clearInterval(alarmBlinker);
  shownSecond.style = 'color: white;';
  shownMinute.style = 'color: white;';
}

function updateShownTime() {
  const minute = Math.floor(secondsToAlarm / 60);
  const second = secondsToAlarm % 60;
  shownSecond.innerText = pad0(second);
  shownMinute.innerText = pad0(minute);
}

function toggleIcon() {
  if (ticking) {
    pauseIcon.style = 'display: block;';
    playIcon.style = 'display: none;';
  } else {
    pauseIcon.style = 'display: none;';
    playIcon.style = 'display: block;';
  }
}

function pad0(number) {
  if (number.toString().length > 1) return number;
  return '0' + number;
}

ipcRenderer.on('toggleSound', function (_, shouldHaveSound) {
  soundOn = shouldHaveSound;
});
