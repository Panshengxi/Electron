let Client = require('ssh2-sftp-client');

const SFTP = {
    Fn(callback,msg){
        if(typeof callback =='function'){
            callback(msg)
        }
    },
    put(localPath,romotePath,callback){
        let sftp = new Client();
        sftp.connect({
            host: '',
            port: '',
            username: 'skyee',
            password: 'skyee123'
        }).then((res) => {
            console.log(res,'-----------------上传中----------------------')
           
            SFTP.Fn(callback,'uploading');
            if(localPath && romotePath){
                return sftp.put(localPath,romotePath);
            }
        }).then((resp) =>{
            console.log(resp,'==============上传完成====================')
            SFTP.Fn(callback,'uploaded');
        }).catch((err) => {
            console.log(err, 'catch error');
            SFTP.Fn(callback,'error');
        });
    }
}

module.exports = {
    put:SFTP.put
}