const { app } = require('electron');
require('electron-reload')(__dirname + '/../render/');
const buildMenuIcon = require('./menuIcon.js');
const buildTimer = require('./timer.js');
let timer;

if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit();
}

function toggleTimer() {
  if (!timer) timer = buildTimer();
  else if (timer.isVisible()) timer.hide();
  else timer.show();
}

app.on('ready', () => {
  buildMenuIcon(toggleTimer, app.quit);
  timer = buildTimer();
});

app.on('before-quit', () => {
  console.log('bye');
});
