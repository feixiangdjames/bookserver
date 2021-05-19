const Router=require('koa-router'),
  fs=require('fs'),
  mongoose=require('mongoose');

const router=new Router()

router.post('/',async ctx=>{

  try{
        let loginData={};
        loginData.USER_ID=ctx.request.body.username;
        loginData.USER_PASSWORD=ctx.request.body.password;

    const user=mongoose.model('user');

    let result = await user.findOne(loginData,(err,doc)=>{

      if(err){
        return err;
      }
      if(doc&&!doc.USER_TIME){
        doc.USER_TIME=Date.now();
        doc.markModified('USER_TIME');
        doc.save();
      }
    }).exec();
    console.log(result);

    result? ctx.body={code:200,message:{key:result.USER_ID,
          bookInfo:result.USER_BOOKINFO,value:result.Login,type:result.USER_TYPE}}:ctx.body={code:200,message: "用户不存在"};

    }catch (e) {
         ctx.body={code:500,message:e}
    }
})

router.post('/register',async ctx=>{

    try {
        const user=mongoose.model('user');
        let loginData={};
        loginData.USER_ID=ctx.request.body.username||'james';
        loginData.USER_PASSWORD=ctx.request.body.password||'123456';
        loginData.USER_TYPE=ctx.request.body.type;
        loginData.ID=ctx.request.body.username;
        loginData.Login=true;

      let userData = new user(loginData);
        await userData.save().then(()=>{
        ctx.body={code:200,message:'注册成功'}
        }).catch(e=>{
          console.log(e);
          ctx.body={code:200,message:e}
        })

    }catch (e) {
      ctx.body={code:500,message:e}
    }

})

router.post('/book', async ctx=>{
  try {
    const { bookId, user:userName} = ctx.request.body;
    const user = mongoose.model('user');
    let result = await user.findOne({ USER_ID: userName });
    result.USER_BOOKINFO.push(bookId);
    await result.markModified('USER_BOOKINFO');
    await result.save();
    ctx.body={code:200,message:{bookInfo:result.USER_BOOKINFO}}

  }catch (e) {
    ctx.body={code:500,message:e}
  }
})

module.exports=router;