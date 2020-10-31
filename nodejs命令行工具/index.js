const db = require('./db.js')

// 为什么全是异步的方法呢，因为文件的操作都是异步的

module.exports.add = async(title) => {
    // 读取之前的任务
    const list =await db.read()
    // 往里面添加一个 title 任务
    list.push({title,done:false})
    // 存储任务到文件
    await db.write(list)
}


module.exports.clear = async(title) =>{
    const list = []
    await db.write(list)
}


module.exports.showAll = async() =>{
    // 读取之前的任务
    const list = await db.read()
    // 打印之前的任务
    list.forEach((task,index)=>{
        console.log(`${task.done? '[x]' : '[_]'} ${index} - ${task.title}`)
    })
}