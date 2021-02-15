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
    backgroundColor: '#333',
    show: false,
    resizable: false,
    alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  window.setVisibleOnAllWorkspaces(true);

  window.loadFile(__dirname + '/../render/timer.html');

  window.once('ready-to-show', () => {
    window.show();
  });

  return window;
};

module.exports = buildTimer;
