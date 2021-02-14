const { Tray, Menu } = require('electron');
let menuIcon;

const buildMenuIcon = (toggleTimer, quit) => {
  menuIcon = new Tray(__dirname + '/../assets/25.png');

  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Show/Hide',
      click: () => toggleTimer(),
    },
    { type: 'separator' },
    { label: 'Quit', click: () => quit() },
  ]);

  menuIcon.on('click', () => {
    if (process.platform === 'win32') toggleTimer();
  });

  menuIcon.setContextMenu(contextMenu);
};

module.exports = buildMenuIcon;
