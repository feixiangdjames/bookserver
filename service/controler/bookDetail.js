const Router=require('koa-router');
const fs=require('fs');
const mongoose=require('mongoose');

const router=new Router();

router.post('/',async ctx=>{

    try {
        let {BOOK_ID,result}=ctx.request.body;
        const page=mongoose.model('page');
        result=await page.find({BOOK_ID}).exec();

        ctx.body={code:200,message:result}

    }catch (e) {
        ctx.body={code:500,message:e}
    }

});

router.post('/new_phrase',async ctx=>{
    try {
        let _ctx=ctx;
        let {pageName:PAGE_NAME,index,value,result}=ctx.request.body;
        const page=mongoose.model('page');
        let doc=await page.findOne({PAGE_NAME});
            doc.PAGE_INFO[index].word=value;
            await doc.markModified('PAGE_INFO');
            await doc.save();
           result=await page.findOne({PAGE_NAME});
             ctx.body={code:200,message:result}
    }catch (e) {
        ctx.body={code:500,message:e}
    }
});

router.get('/create_book',async(ctx)=>{
    fs.readFile('./content2.json','utf8',(err,data)=> {
        data = JSON.parse(data);
        let saveCount = 0;
        const book = mongoose.model('page');
        data.map((value, index) => {
            let temp = {};
            temp.ID=value.name;
            temp.BOOK_ID = value.name.split('yy')[2];
            temp.PAGE_NAME = value.name;
            temp.PAGE_CODE=parseInt(value.name.split('yy')[3]);
            temp.PAGE_INFO = value.infos[0]
                .map(item=>{
                    if(Object.keys(item.startTime).length === 0) item.startTime=0;
                return {start:item.startTime,
                    end:item.endTime,
                    word:item.word}});

            let newBook = new book(temp);
            newBook.save().then(() => {
                saveCount++;
                console.log('插入成功:' + saveCount)
            }).catch(error => {
                console.log('插入失败:' + error)
            })
        })
    })
});

router.get('/setLetter',async(ctx)=>{
    const page=mongoose.model('page');
    await page.find({},(err,doc)=>{

        doc.map(item=>{
           let temp=item.PAGE_INFO[0].word;

        })

    });
});

router.post('/word',async ctx=>{

  const {width,top,left,fontSize,pageName}=ctx.request.body;
  console.log(ctx.request.body);
  const page=mongoose.model(('page'));
  await page.findOne({PAGE_NAME:pageName},(err,doc)=>{
       doc.WIDTH=width;
       doc.TOP=top;
       doc.LEFT=left;
       doc.FONTSIZE=fontSize;
       doc.markModified();
       doc.save();

  });

  let result= await page.findOne({PAGE_NAME:pageName}).exec();
  ctx.body={code:200,message:result}
});


module.exports=router;