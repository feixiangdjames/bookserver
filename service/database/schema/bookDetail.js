const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const bookDetailSchema=new Schema({
    ID:{unique:true,type:String},
    BOOK_ID:{type:String},
    PAGE_ID:{type:String},
    PAGE_NAME:{type:String},
    PAGE_CODE:{type:Number},
    PAGE_INFO:{type:Array},
    COMMENTS:{type:String},
    BOOK_NAME:{type:String},
    WIDTH:{type:String},
    TOP:{type:String},
    LEFT:{type:String},
    FONTSIZE:{type:String},
    TEXTBOX:{type:String}
});


mongoose.model('page',bookDetailSchema);