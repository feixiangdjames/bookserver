const Koa=require('koa');
const app=new Koa();
const {connect,initSchema}=require('./database/init');
const bodyParse=require('koa-bodyparser');
const cors=require('koa2-cors');


(async ()=>{
    await connect();

    initSchema();
})();

app.use(bodyParse());

//
app.use(cors({
    credentials: true,
    allowMethods: ['GET', 'POST'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept','x-requested-with','Access-Control-Allow-Origin']
}));
//router
const Route=require('koa-router');
const router=new Route();

let book=require('./controler/book.js');
router.use('/v1/booklist',book.routes());

let oneBook=require('./controler/bookDetail.js');
router.use('/v1/book',oneBook.routes());

let login=require('./controler/loggin');
router.use('/v1/login',login.routes());

app.use(router.routes());
app.use(router.allowedMethods());

app.use(async ctx=>{
    ctx.body='<h1> hello koa</h1>'
});

app.listen(23023,()=>{
    console.log('[server] starting at port 23023')
});