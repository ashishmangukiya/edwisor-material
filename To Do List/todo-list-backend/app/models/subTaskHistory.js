const mongoose=require('mongoose');
const time=require('../libs/timeLib')
const schema=mongoose.Schema


let historyOfSubTask=new schema({

    subTaskId:{
        type:String,
        default:''
    },
   
    subTask:{
        type:Object,
        default:{}
    },
    createdOn:{
        type:Date,
        default:new Date()
    }
})
module.exports=mongoose.model('subTaskHistory',historyOfSubTask);