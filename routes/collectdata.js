var Model = require('../models/index')
var router = require('koa-router')();

router.get('/', async function (ctx, next) {


    await Model.userList.find({userName: ctx.query.owner}, {userName: true}, function (err, docs) {
        if (!err) {
            if (docs !== '') {
                let time = new Date()
                let newdata = [{
                    owner: ctx.query.owner,
                    data: ctx.query.data||'null',
                    time: time,
                    nodeName: ctx.query.nodeName||'null',
                    positionName: ctx.query.positionName||'null'

                }]
                Model.collectDataList.create(newdata, (err) => {
                    if (err) {
                         console.log(err)
                    } else {
                        console.log(newdata)
                        console.log('success')
                    }
                })
                ctx.body = {
                    owner: ctx.query.owner,
                    data: ctx.query.data || 'null',
                    time: time,
                    nodeName: ctx.query.nodeName||'null',
                    positionName: ctx.query.positionName||'null'
                }


            } else {



                ctx.body = {
                    result: false

                }

            }

        } else {
            console.log(err);
        }

    });
    //   await ctx.render('index', {
    //   });
    await next()
})
module.exports = router;