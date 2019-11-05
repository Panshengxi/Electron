
const BMF = require('browser-md5-file');
const fs = require('fs');
const shell = require('shelljs');
const zipFolder = require('zip-folder');


const UTIL = {
    bmf: new BMF(),
    createFile(path, content) {
        fs.writeFile(path, content, function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("The file was saved!");
        });
    },
    initFormat() {
        if (!Date.prototype.format) {
            Date.prototype.format = function (format) { //author: meizz   
                format = format ? format : 'yyyy-MM-dd HH:mm:ss'
                var o = {
                    "M+": this.getMonth() + 1, //month
                    "d+": this.getDate(), //day
                    "H+": this.getHours(), //hour
                    "m+": this.getMinutes(), //minute
                    "s+": this.getSeconds(), //second
                    "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
                    "S": this.getMilliseconds() //millisecond
                }
                if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
                    (this.getFullYear() + "").substr(4 - RegExp.$1.length));
                for (var k in o)
                    if (new RegExp("(" + k + ")").test(format))
                        format = format.replace(RegExp.$1,
                            RegExp.$1.length == 1 ? o[k] :
                                ("00" + o[k]).substr(("" + o[k]).length));
                return format;
            }
        }
    },
    packageTozip(sourceFileName,targetFileName) {
       
        shell.rm('-rf', targetFileName);
        console.log(`rm -rf ${targetFileName}\n`);

        zipFolder(sourceFileName, targetFileName, function (err) {
            if (err) {
                console.log('oh no!', err);
            } else {
                console.log(`zip: ${sourceFileName} -> ${targetFileName}\n`);
            }
        });
    }
}
module.exports = UTIL;