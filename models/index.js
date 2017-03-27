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

//用户表
const userListSchema = new mongoose.Schema({
    userName: String,
    pwd: String,
    time: Date,
    sex: String,
    age: Number,
    email: String
})
//设备表
const equipmentListSchema = new mongoose.Schema({
    name: String,
    state: Number,
    owner: String,
    changeTime : Date

})
//收集数据表
const collectDataListSchema = new mongoose.Schema({
    owner: String, //所有者
    data: Object,
    time: Date,
    nodeName: String,
    positionName :String
})
//查看所有收集数据
// const findalldata = new mongoose.Schema({

// })


// 创建model
const Model = {
    equipmentList: mongoose.model('equipmentList', equipmentListSchema),
    userList: mongoose.model('userList', userListSchema),
    collectDataList: mongoose.model('collectDataList',collectDataListSchema)
}
module.exports = Model