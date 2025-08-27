import {app, BrowserWindow, ipcMain} from 'electron';
import path from 'path';
import {fileURLToPath} from 'url';

// 修复 __dirname 在 ES 模块中的问题
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 屏蔽浏览器控制台警告
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true';

export const createMainWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 550,
    minWidth: 800,
    minHeight: 550,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: path.join(__dirname, './preload.js')
    }
  });

  // 监听渲染进程发送的消息
  ipcMain.handle('test', (e, value) => {
    console.log(value);
    e.sender.send('main-test', 'main send message: ' + value);
  });

  // 开启调试工具
  win.webContents.openDevTools();

  // 动态获取端口（因为Vite可能使用5174）
  const port = process.env.VITE_DEV_SERVER_PORT || 5173;
  win.loadURL(`http://localhost:${port}`);
};

app.whenReady().then(createMainWindow);

// 添加窗口管理
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
});
