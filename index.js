const { app, BrowserWindow,screen } = require('electron/main')
const path = require('node:path')

function createWindow () {
  const primaryDisplay=screen.getPrimaryDisplay();
const{width,height}=primaryDisplay.workAreaSize;
  const win = new BrowserWindow({
    width: 400,
    height: 300,
    x:width-350,
    y:0,
    frame:false,
    transparent:true,
    alwaysOnTop:true,
    webPreferences: {
      nodeIntegration:true,
      contextIsolation:false,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})