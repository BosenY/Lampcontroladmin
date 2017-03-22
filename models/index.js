'use strict'
const mongoose = require('mongoose')
    // 连接mongodb
mongoose.connect('mongodb://localhost/demo')
    // 实例化连接对象
const db = mongoose.connection
db.on('error', console.error.bind(console, '连接错误：'))
db.once('open', (callback) => {
        console.log('MongoDB连接成功！！')
    })
    // 创建schema


const userListSchema = new mongoose.Schema({
    userName: String,
    pwd: String,
    time: Date,
    sex: String,
    age: Number,
    email: String
})
const equipmentListSchema = new mongoose.Schema({
    name: String,
    state: Number,
    owner: String,
    changeTime : Date

})


// 创建model
const Model = {

    equipmentList: mongoose.model('equipmentList', equipmentListSchema),
    userList: mongoose.model('userList', userListSchema)

}
module.exports = Model