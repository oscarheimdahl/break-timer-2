const { app, ipcMain, globalShortcut } = require('electron');
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

ipcMain.on('print', function (_, data) {
  console.log(data);
});

function toggleTimer() {
  const visible = timer.isVisible();
  if (visible) timer.hide();
  else timer.show();
  return !visible;
}

app.on('ready', () => {
  timer = buildTimer();
  buildMenuIcon(toggleTimer, toggleSound, app.quit);
  globalShortcut.register('CommandOrControl+Alt+H', () => toggleTimer());
  if (process.platform === 'darwin') app.dock.hide();
});
