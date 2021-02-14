const { BrowserWindow, screen, ipcMain } = require('electron');

let window = null;

const buildTimer = () => {
  window = new BrowserWindow({
    width: 195,
    height: 40,
    skipTaskbar: true,
    fullscreenable: false,
    maximizable: false,
    frame: false,
    resizable: false,
    alwaysOnTop: true,
  });

  window.loadFile(__dirname + '/../render/timer.html');

  return window;
};

module.exports = buildTimer;
