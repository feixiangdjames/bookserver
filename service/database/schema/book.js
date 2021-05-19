const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const bookSchema=new Schema({

    ID:{type:String},
    BOOK_ID:{type:String},
    BOOk_NAME:{type:String},
    SORT:{type:Number},
    COMMENTS:{type:String},
    LEVEL:{type:String},

});

mongoose.model('booklist',bookSchema);