const {app, BrowserWindow, ipcMain, Menu, shell} = require ('electron')
const url = require('url')
const path = require('path')
const serv = require(path.join(__dirname, 'src', 'index.js'))
require('dotenv').config()
let mainWindow

function createWindow ()
{
    mainWindow = new BrowserWindow(
    {
      width: 850,
      height: 650,
      webPreferences:
      {
        nodeIntegration: true,
        contextIsolation: true,
        preload: path.join(__dirname, 'preload.js')
      },
      // show: false
    })

    mainWindow.loadURL(`http://localhost:${process.env.PORT}`);

    // mainWindow.webContents.on('did-finish-load', () =>
    // {
    //   mainWindow.show();
    // });

    mainWindow.setMinimumSize(800, 600)

    mainWindow.on('closed', function()
    {
      mainWindow = null
    })

    ipcMain.on('seon-click', (event) =>
    {
      event.returnValue = 'Open'
      shell.openExternal("https://docs.seon.io/api-reference#email-api-response");
    })

    ipcMain.on('iqs-click', (event) =>
    {
      event.returnValue = 'Open'
      shell.openExternal("https://www.ipqualityscore.com/documentation/email-validation/overview#:~:text=or%20creation%20date.-,Field,Possible%20Values,-valid");
    })
}

app.on('ready', createWindow)

app.on('window-all-closed', function ()
{
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function ()
{
  if (mainWindow === null) createWindow()
})

let menu = Menu.buildFromTemplate(
[
  {
    label: "Settings",
    submenu:
    [
      {
        label: "Minimize",
        role: "minimize"
      },
      {
        type: "separator"
      },
      {
        label: "Zoom +",
        click: () =>
        {
          const contents = mainWindow.webContents;
          const level = contents.getZoomLevel()
          contents.setZoomLevel(level + 0.5)
        },
        accelerator: "CmdOrCtrl + numadd"
      },
      {
        label: "Zoom -",
        click: () =>
        {
          const contents = mainWindow.webContents;
          const level = contents.getZoomLevel()
          contents.setZoomLevel(level - 0.5)
        },
        accelerator: "CmdOrCtrl + numsub"
      },
      {
        type: "separator"
      },
      {
        label: "Logout",
        click: () =>
        {
          mainWindow.loadURL(`http://localhost:${process.env.PORT}/signout`);
        },
        visible: true
      },
      {
        type: "separator"
      },
      {
        label: "Quit app",
        click: () =>
        {
          app.quit();
        }
      }
    ]
  },
  {
    label: "Documentations",
    submenu:
    [
      {
        label: "Seon",
        click: () =>
        {
          shell.openExternal("https://docs.seon.io/api-reference#email-api-response");
        }
      },
      {
        label: "IPQualityScore",
        click: () =>
        {
          shell.openExternal("https://www.ipqualityscore.com/documentation/email-validation/overview#:~:text=or%20creation%20date.-,Field,Possible%20Values,-valid");
        }
      }
    ]
  },
  // {
  //   label: "Dev",
  //   submenu:
  //   [
  //     {
  //       label: "Toggle Dev Tools",
  //       role: "toggleDevTools"
  //     },
  //     {
  //       label: "Reload",
  //       role: "reload",
  //     },
  //     {
  //       label: "Force reload",
  //       role: "forcereload",
  //     }
  //   ]
  // }
])

Menu.setApplicationMenu(menu)