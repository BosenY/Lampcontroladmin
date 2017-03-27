var Model = require('../models/index')
var router = require('koa-router')();

router.get('/', async function (ctx, next) {


 await  Model.collectDataList.find({ owner: ctx.query.owner}, {  }, function(err, docs) {
    if(docs.length!=0) {
        ctx.body = docs
    } else {
        ctx.body = {
            result: 'error',
            reason: 'no owner'
        }
    }

            
        });

await next()
})
module.exports = router;
