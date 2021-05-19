const mongoose=require('mongoose');
const db=["mongodb://127.0.0.1:33007/readbook",
    {
        useNewUrlParser:true,
        useUnifiedTopology:true,
        useCreateIndex:true
    }];

exports.connect=()=>{
    mongoose.connect(...db);
    let maxConnectTimes=0;
    return new Promise((resolve,reject)=>{
        mongoose.connection.on('disconnected',()=>{
            console.log('******database disconnected');
            if(maxConnectTimes<=3){
                maxConnectTimes++;
                mongoose.connect(...db)
            }else{
                reject();
                throw new Error('database is wrong,app can not conect')
            }
        });

        mongoose.connection.on('error',(err)=>{
            console.log('*******database error');
            if(maxConnectTimes<=3){
                maxConnectTimes++;
                mongoose.connect(...db)
                reject(err);
                throw new Error('database is wrong,app can not conect')
            }
        });

        mongoose.connection.once('open', () => {
            console.log('******db success');
            resolve();
        });
    })
};


const glob=require('glob');
const {resolve}=require('path');
exports.initSchema=()=>{
    glob.sync(resolve(__dirname,'./schema','**/*.js')).forEach(require)
};