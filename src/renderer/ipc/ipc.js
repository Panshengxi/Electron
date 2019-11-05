const  ipcRenderer  =  require('electron').ipcRenderer; 

const IPC_RENDER = {
    logout() {
        ipcRenderer.send('logout', 'logout')
    },
   
    login(){
        ipcRenderer.send('login', 'login')　
    }

}
module.exports = IPC_RENDER;
