const { BrowserWindow, screen, ipcMain } = require('electron');

let window = null;

const buildTimer = () => {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  window = new BrowserWindow({
    width: 280,
    height: 70,
    skipTaskbar: true,
    fullscreenable: false,
    maximizable: false,
    frame: false,
    transparent: true,
    resizable: false,
    alwaysOnTop: true,
    webPreferences: {
      contextIsolation: false,
      enableRemoteModule: true,
      nodeIntegration: true,
    },
  });

  window.loadFile(__dirname + '/../render/timer.html');

  return window;
};

module.exports = buildTimer;
