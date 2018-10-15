const mongoose=require('mongoose');
const time=require('../libs/timeLib')
const schema=mongoose.Schema


let historyOfTask=new schema({

    taskId:{
        type:String,
        default:''
    },
   
    task:{
        type:Object,
        default:{}
    },
    createdOn:{
        type:Date,
        default:new Date()
    }
})


module.exports=mongoose.model('taskHistory',historyOfTask);