const { app, ipcMain } = require('electron');
require('electron-reload')(__dirname + '/../render/');
const buildMenuIcon = require('./menuIcon.js');
const buildTimer = require('./timer.js');
let timer;

if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit();
}

function toggleSound(bool) {
  timer.webContents.send('toggleSound', bool);
}

function toggleTimer() {
  const visible = timer.isVisible();
  if (visible) timer.hide();
  else timer.show();
  return !visible;
}
if (process.platform === 'darwin') app.dock.hide();
app.on('ready', () => {
  timer = buildTimer();
  buildMenuIcon(toggleTimer, toggleSound, app.quit);
});
