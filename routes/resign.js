var Model = require('../models/index')
var router = require('koa-router')();

router.get('/', async function (ctx, next) {


 await  Model.userList.find({ userName: ctx.query.userName }, { userName: true, pwd: true }, function(err, docs) {
        if (!err) {
            if (docs == '') {
                     ctx.body = {
                         result: 'success',
                         data:{     
                            userName: ctx.query.userName,
                            pwd: ctx.query.pwd,
                            time: new Date()
                        }
                   

                    }
                let newUser = [{
                        userName: ctx.query.userName,
                        pwd: ctx.query.pwd,
                        time: new Date()

                    }]
                Model.userList.create(newUser, (err) => {
                    if (err) {
                         console.log(err)
                    } else {
                        console.log(newUser)
                        console.log('success')
                    }
                })

            } else {


                   
                ctx.body = {
                        result: false,
                        
                    }
                 console.log('false')
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
