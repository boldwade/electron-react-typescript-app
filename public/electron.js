// import { BrowserTab } from '../src/browser-tab/browser-tab';
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
// const BrowserTab = electron.BrowserView;

let mainWindow;
let browserTab;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1600,
        height: 1000,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js')
        }
    });

    // browserTab = new BrowserTab();
    //
    // browserTab.addToWindow(mainWindow);

    mainWindow.loadURL(
        isDev
            ? 'http://localhost:3000'
            : `file://${path.join(__dirname, '../build/index.html')}`
    );

    mainWindow.on('closed', () => mainWindow = null);
}

ipcMain.on('test-channel', (event, args) => {
    console.log('test-channel:event', event, args);
});

app.whenReady().then(() => {
    createWindow();

    app.on('activate', function() {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', function() {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});
