const { Tray, Menu } = require('electron');
let menuIcon;
let sound = true;
let visible = true;
const buildMenuIcon = (toggleTimer, toggleSound, quit) => {
  if (process.platform === 'darwin')
    menuIcon = new Tray(__dirname + '/../assets/IconTemplate.png');
  else menuIcon = new Tray(__dirname + '/../assets/25.png');

  function toggleSoundWrapper() {
    sound = !sound;
    toggleSound(sound);
    setContextMenu();
  }
  function toggleTimerWrapper() {
    visible = toggleTimer();
    setContextMenu();
  }

  function setContextMenu() {
    menuIcon.setContextMenu(
      Menu.buildFromTemplate([
        {
          label: visible ? 'Hide' : 'Show',
          click: toggleTimerWrapper,
        },
        {
          label: sound ? 'Mute' : 'Unmute',
          click: toggleSoundWrapper,
        },
        { type: 'separator' },
        { label: 'Quit', click: () => quit() },
      ])
    );
  }

  setContextMenu();
};
module.exports = buildMenuIcon;
