const { BrowserWindow, screen, ipcMain } = require('electron');

let window = null;

const buildTimer = () => {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  window = new BrowserWindow({
    width: 280,
    height: 70,
    frame: false,
    titleBarStyle: 'hidden',
    skipTaskbar: true,
    // show: false,
    // focusable: false,
    fullscreenable: false,
    maximizable: false,
    transparent: true,
    // backgroundColor: '#222',
    resizable: false,
    alwaysOnTop: true,
    webPreferences: {
      contextIsolation: false,
      enableRemoteModule: true,
      nodeIntegration: true,
    },
  });
  window.loadURL(__dirname + '/../render/timer.html');

  //   window.on('');
  return window;
};

module.exports = buildTimer;
