const qiniu=require('qiniu');
const fs=require('fs');
const path=require('path');
var accessKey = 'PkGaCSS-LS7hWlhol58KmFkfRLSGKlKoumJ9mvlc';
var secretKey = 'abaFAcODb2TIpcbFgMpHiOvlqWXFpv5UfGwqjNnN';
var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);

var options = {
    scope: 'bookcom'
};
var putPolicy = new qiniu.rs.PutPolicy(options);
var uploadToken=putPolicy.uploadToken(mac);
var config = new qiniu.conf.Config();
config.zone = qiniu.zone.Zone_na0;
let mypath=path.resolve('../src/static/img/book6');

fs.readdir('../src/static/img/book6',(err,files)=>{

    const total=files.length;
    function upload(files,total){
        console.log("job start");
        if(!files.length){
            return
        }
        const file=files.pop();

         const localFile=mypath+"\\"+file;
        const formUploader = new qiniu.form_up.FormUploader(config);
        const putExtra = new qiniu.form_up.PutExtra();

        formUploader.putFile(uploadToken,file,localFile,putExtra,function(respErr, respBody, respInfo) {
            if (respErr) {
                console.log(respErr);
                files.push(file);
                upload(files,total);
            }
            if (respInfo.statusCode === 200) {

                console.log(respBody);
                  upload(files,total);
            } else {
                upload(files,total);
                console.log(respInfo.statusCode);
                console.log(respBody);
            }
        })

    }

    for(let i=0;i<6;i++){
        upload(files,total);
    }
})
//console.log(mypath);
/*
var localFile = "/Users/jemy/Documents/qiniu.mp4";
var formUploader = new qiniu.form_up.FormUploader(config);
var putExtra = new qiniu.form_up.PutExtra();
var key='test.mp4';
// 文件上传
formUploader.putFile(uploadToken, key, localFile, putExtra,
    function(respErr, respBody, respInfo) {
    if (respErr) {
        throw respErr;
    }
    if (respInfo.statusCode === 200) {
        console.log(respBody);
    } else {
        console.log(respInfo.statusCode);
        console.log(respBody);
    }
});*/
