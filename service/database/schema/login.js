const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const userSchema=new Schema({
    ID:{type:String},
    USER_ID:{type:String},
    USER_PASSWORD:{type:String},
    USER_TYPE:{type:String},
    Login:{type:Boolean},
    USER_TIME:{type:Date},
    USER_BOOKINFO:{type:Array},
    createAt:{type:Date,default:Date.now()}
});
mongoose.model('user',userSchema);