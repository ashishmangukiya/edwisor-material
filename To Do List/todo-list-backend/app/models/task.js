const mongoose=require('mongoose');
const time=require('./../libs/timeLib')
const schema=mongoose.Schema;

let task=new schema(
    {
        taskId:{
            type:String,
            unique:true,
            index:true,
            default:''
        },
        taskTitle:{
            type:String,
            default:''
        },
        taskList:[
            {
            id:{type:String,default:''},
            taskName:{type:String,default:''},
            completed:{type:Boolean,default:false},
            subTaskList:[
                {
            subTaskId:{type:String,default:''},
               subTaskName:{type:String,default:''},
                subTaskCompleted:{type:Boolean,default:false},
                }
        ]
        }],
        userId:{
            type:String,
            default:''
        },
        userName:{
            type:String,
            default:''
        },
        completed:{
            type:Boolean,
            default:false
        },
        createdOn:{
            type:Date,
            default:time.now()
        },
        private:{
            type:Boolean,
            default:false
        }
    }
)

module.exports=mongoose.model('Task',task)