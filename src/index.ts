import {app, ipcMain, BrowserWindow} from 'electron';
import * as path from 'path';

let mainWindow : BrowserWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 400, height: 400,
        webPreferences: {
            preload: path.resolve(__dirname, 'preload.js'),
            nodeIntegration: true,
            sandbox: false,
            contextIsolation: true,
        },
        show: false,
        resizable: false,
    });

    mainWindow.setMenu(null);

    mainWindow.loadFile('./index.html');
    mainWindow.on('ready-to-show', () => {
        mainWindow.show();
    });
});