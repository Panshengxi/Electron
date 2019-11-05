const { app, BrowserWindow,Menu } = require('electron')
const ipcMain = require('electron').ipcMain


// 保持对window对象的全局引用，如果不这么做的话，当JavaScript对象被
// 垃圾回收的时候，window对象将会自动的关闭
let win = null;

function createWindow() {
    // 创建浏览器窗口。
    win = new BrowserWindow({ width: 800, height: 600 ,webPreferences:{
        nodeIntegration:true
        }})

    win.loadFile(`${__dirname}/index.html`)
    
    // 打开开发者工具
    if (process.env.NODE_ENV === 'development') {
        win.webContents.openDevTools()
    }else {
        Menu.setApplicationMenu(null)
    }

    // 当 window 被关闭，这个事件会被触发。
    win.on('closed', () => {
        // 取消引用 window 对象，如果你的应用支持多窗口的话，
        // 通常会把多个 window 对象存放在一个数组里面，
        win = null
    })
}
// Electron 会在初始化后并准备
// 创建浏览器窗口时，调用这个函数。
// 部分 API 在 ready 事件触发后才能使用。
app.on('ready', createWindow)

// 当全部窗口关闭时退出。
app.on('window-all-closed', () => {
    // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
    // 否则绝大部分应用及其菜单栏会保持激活。
    if (process.platform !== 'darwin') {
        app.quit()
    }
    console.log('close')
})

app.on('activate', () => {
    // 在macOS上，当单击dock图标并且没有其他窗口打开时，
    // 通常在应用程序中重新创建一个窗口。
    if (win === null) {
        createWindow()
    }
})
// 在这个文件中，你可以续写应用剩下主进程代码。
// 也可以拆分成几个文件，然后用 require 导入

// if (process.env.NODE_ENV === 'development') {
//     require('electron-watch')(
//         __dirname+'/src',
//         'dev:main',     // means: npm run dev:electron-main
//         process.cwd(),  // cwd
//         3000,           // 防抖函数延迟参数
//     );
// }

// 页面路由
ipcMain.on('login', (sys, msg) => {
    console.log(msg)
    win.loadFile(`${__dirname}/renderer/page/home/home.html`)
})

ipcMain.on('logout', (sys, msg) => {
    console.log(msg)
    win.loadFile(`${__dirname}/index.html`)
})

// 实时检测更新
require('update-electron-app')()




