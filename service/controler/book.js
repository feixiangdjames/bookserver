const Router=require('koa-router');
const fs=require('fs');
const mongoose=require('mongoose');

const router=new Router();

router.get('/',async(ctx)=>{
 try {
     const book=mongoose.model('booklist');
     let result= await book.find({}).exec();
     console.log(result.length);
     ctx.body={code:200,message:result}
 }catch (e) {
     ctx.body={code:500,message:e}
 }
});

router.post('/level',async(ctx)=>{

    try {
        let {bookId:BOOK_ID,level:LEVEL,result}=ctx.request.body;
        const book=mongoose.model('booklist');
        await book.findOne({BOOK_ID},(err,doc)=>{
            console.log(doc,"---",LEVEL);
            doc.LEVEL=LEVEL;
            doc.markModified('LEVEL');
            doc.save();

        })
        result=await book.findOne({BOOK_ID}).exec();
        console.log(result.LEVEL);
        ctx.body={code:200,message:result};
    }catch (e) {
        ctx.body={code:500,message:e}
    }
});

router.get('/level',async(ctx)=>{
    try {
        const book=mongoose.model('booklist');
        let result= await book.find({}).exec();
        result=[...new Set(result.map(item=>item=item.LEVEL))];
        ctx.body={code:200,message:result}
    }catch (e) {
        ctx.body={code:500,message:e}
    }
});

router.post('/level/current',async(ctx)=>{
    try {
        let {BOOK_ID:BOOK_ID,result}=ctx.request.body;
        console.log(ctx.request.body);
        const book=mongoose.model('booklist');
        result=await book.findOne({BOOK_ID}).exec();

        ctx.body={code:200,message:result.LEVEL};
    }catch (e) {
        ctx.body={code:500,message:e}
    }
});

router.get('/rename',async(ctx)=>{
    const page=mongoose.model('page');
    const booklist=mongoose.model('booklist');
  let $booklist = await booklist.find();
  let $page=await page.find({PAGE_NAME:{$regex:/.*yy1$/i}})
    let temparray=[];
    $page.forEach(item=>{

        let str='';
        let key=item.BOOK_ID;
        item.PAGE_INFO.forEach(info=>str+=info.word+" ")
        let temp={key,str};
        temparray.push(temp);

    })

    $booklist.forEach(async item=>{
        for(let arr of temparray){
            if(arr.key==item.BOOK_ID){
                //item.BOOk_NAME=arr.str;
              item.BOOk_NAME=arr.str.split(',')[0];
                await item.markModified('BOOk_NAME');
                 item.save();
                 break;
            }

        }
    })
});

//this function for resume
router.get('/getdata',async(ctx)=> {
    try {
        const page = mongoose.model('page');
        const booklist = mongoose.model('booklist');
        let $booklist = await booklist.find({BOOK_ID:'32'});
        let $page = await page.find({BOOK_ID:'32'})
        ctx.body={code:200,message:[$page,$booklist]};
    } catch (e) {
    ctx.body={code:500,message:e}
}
})

module.exports=router;













