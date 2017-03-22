var Model = require('../models/index')
var router = require('koa-router')();

router.get('/', async function (ctx, next) {


 await  Model.userList.find({ }, { userName: true, pwd: true }, function(err, docs) {

        ctx.body = docs
    });
//   await ctx.render('index', {
//   });
await next()
})
module.exports = router;
