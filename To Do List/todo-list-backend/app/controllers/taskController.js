const mongoose = require('mongoose');
const shortid = require('shortid');
const time = require('./../libs/timeLib');
const response = require('./../libs/responseLib')
const logger = require('./../libs/loggerLib');
const validateInput = require('../libs/paramsValidationLib')
const check = require('../libs/checkLib')
const AuthModel= mongoose.model('Auth');
const UserModel = mongoose.model('User');
const passwordLib=require('./../libs/generatePasswordLib')
const emailLib=require('./../libs/emailLib')
const token=require('./../libs/tokenLib')
const taskModel=mongoose.model('Task');
const requestModel=mongoose.model('friendRequest');
let getAllTasksFunction=(req,res)=>{
    let findTasks=()=>{
    return new Promise((resolve,reject)=>{
        taskModel.find({userId:req.body.userId},(err,result)=>{
            if(err){
                logger.error(true, 'taskController: getAllTasksFunction', 10)
                let apiResponse = response.generate(true, 'Failed To find tasks', 500, null)
                reject(apiResponse)
            }
            else if(check.isEmpty(result)){
                logger.error('tasks not found','taskController:getAllTasksFunction()',4);
                let apiResponse=response.generate(true,'empty tasks list',500,null)
                reject(apiResponse);
            }
            else{
                resolve(result);
            }
        })
    })
}
findTasks(req,res)
.then((resolve)=>{
    let apiResponse=response.generate(false,'task detail found',200,resolve)
    res.send(apiResponse)
}).catch((err)=>{
    res.send(err)
})
}

let getAllfriendsRequestFunction=(req,res)=>{
    requestModel.find({$and:[{ recieverId:req.body.userId},{active:false}]},(err,result)=>{
        if(err){
            logger.error(true, 'taskController: getAllfriendsRequestFunction', 10)
            let apiResponse = response.generate(true, 'Failed To find friends request', 500, null)
            res.send(apiResponse)
        }
        else if(check.isEmpty(result)){
            logger.error('friend request not found','taskController:getAllfriendsRequestFunction()',4);
            let apiResponse=response.generate(true,'empty friend-request list',500,null)
            res.send(apiResponse);
        }
        else{
            let apiResponse=response.generate(false,'friend request list found',200,result);
            res.send(apiResponse)
        }
    })

}

let getUserDetailFunction=(req,res)=>{
        UserModel.find({userId:req.body.userId},(err,result)=>{
            if(err){
                logger.error(true, 'taskController: getUserDetailFunction', 10)
                let apiResponse = response.generate(true, 'Failed To find user detail', 500, null)
                res.send(apiResponse)
            }
            else if(check.isEmpty(result)){
                logger.error('tasks not found','taskController:getUserDetailFunction()',4);
                let apiResponse=response.generate(true,'user not found',500,null)
                res.send(apiResponse);
            }
            else{
                let apiResponse=response.generate(false,'user found',200,result)
                res.send(apiResponse);
            }
        })
}

let getAllFriendTasksFunction=(req,res)=>{
    let findFriendTasks=()=>{
        return new Promise((resolve,reject)=>{
            taskModel.find({$and:[{userId:req.body.userId},{'private':'false'}]},(err,result)=>{
                if(err){
                    logger.error(true, 'taskController: getAllTasksFunction', 10)
                    let apiResponse = response.generate(true, 'Failed To find friend tasks', 500, null)
                    reject(apiResponse)
                }
                else if(check.isEmpty(result)){
                    logger.error('tasks not found','taskController:getAllTasksFunction()',4);
                    let apiResponse=response.generate(true,'empty friend tasks list',500,null)
                    reject(apiResponse);
                }
                else{
                    resolve(result);
                }
            })
        })
    }
    findFriendTasks(req,res)
    .then((resolve)=>{
        let apiResponse=response.generate(false,'task detail found',200,resolve)
        res.send(apiResponse)
    }).catch((err)=>{
        res.send(err)
    })
}

let deleteFriendFullTaskFunction=(req,res)=>{
    taskModel.remove({taskId:req.body.taskId},(err,result)=>{
        if(err){
            logger.error(true, 'taskController: deleteFriendFullTaskFunction', 10)
            let apiResponse = response.generate(true, 'Failed To delete task', 500, null)
            res.send(apiResponse)       
         }
        else if(check.isEmpty(result)){
            logger.error('tasks not found','taskController:deleteFriendFullTaskFunction()',4);
            let apiResponse=response.generate(true,'task detail not found',500,null)
            res.send(apiResponse);       
         }
         else{
            let apiResponse=response.generate(false,'task deleted',200,result)
            res.send(apiResponse);       
        }
    })
}

let addFriendTaskFunction=(req,res)=>{
    taskModel.update({taskId:req.body.taskId},{$push:{'taskList':{'id':shortid.generate(),'taskName':req.body.taskName}}},(err,result)=>{
        if(err){
            logger.error(true, 'taskController: addFriendTaskFunction', 10)
            let apiResponse = response.generate(true, 'Failed To add task', 500, null)
            res.send(apiResponse)         
        }
        else if(check.isEmpty(result)){
            logger.error('tasks not found','taskController:addFriendTaskFunction()',4);
            let apiResponse=response.generate(true,'task detail not found',500,null)
            res.send(apiResponse);       
         }
         else{
            let apiResponse=response.generate(false,'task added',200,result)
            res.send(apiResponse);       
        }

    })
}
let addFriendSubTaskFunction=(req,res)=>{
    taskModel.update({'taskList.id':req.body.id},{$push:{'taskList.$.subTaskList':{'subTaskId':shortid.generate(),'subTaskName':req.body.subTaskName}}},(err,result)=>{
        if(err){
            logger.error(true, 'taskController: addFriendSubTaskFunction', 10)
            let apiResponse = response.generate(true, 'Failed To add sub-task', 500, null)
            res.send(apiResponse)         
        }
        else if(check.isEmpty(result)){
            logger.error('tasks not found','taskController:addFriendSubTaskFunction()',4);
            let apiResponse=response.generate(true,'task detail not found',500,null)
            res.send(apiResponse);       
         }
         else{
            let apiResponse=response.generate(false,'sub-task added',200,result)
            res.send(apiResponse);       
        }

    })

}
let editFriendTaskFunction=(req,res)=>{
    taskModel.update({'taskList.id':req.body.id},{$set:{'taskList.$.taskName':req.body.taskName}},{multi:true},(err,result)=>{

        if(err){
            logger.error(true, 'taskController: editFriendTaskFunction', 10)
            let apiResponse = response.generate(true, 'Failed To edit task', 500, null)
            res.send(apiResponse)          
        }
            else if(check.isEmpty(result)){
                logger.error('tasks not found','taskController:editFriendTaskFunction()',4);
                let apiResponse=response.generate(true,'task detail not found',500,null)
                res.send(apiResponse);       
             }
             else{
                let apiResponse=response.generate(false,'task edited',200,result)
                res.send(apiResponse);       
            }

    })

}
let editFriendSubTaskFunction=(req,res)=>{
    taskModel.update({},{$set:{'taskList.$[i].subTaskList.$[j].subTaskName':req.body.subTaskName}},{arrayFilters:[{'i.id':req.body.id},{'j.subTaskId':req.body.subTaskId}],multi:true},(err,result)=>{

        if(err){
            logger.error(true, 'taskController: editFriendSubTaskFunction', 10)
            let apiResponse = response.generate(true, 'Failed To edit sub-task', 500, null)
            res.send(apiResponse)          
        }
            else if(check.isEmpty(result)){
                logger.error('tasks not found','taskController:editFriendSubTaskFunction()',4);
                let apiResponse=response.generate(true,'sub-task detail not found',500,null)
                res.send(apiResponse);       
             }
             else{
                let apiResponse=response.generate(false,'sub-task edited',200,result)
                res.send(apiResponse);       
            }

    })
}
module.exports={
    getAllTasksFunction:getAllTasksFunction,
    getAllfriendsRequestFunction:getAllfriendsRequestFunction,
    getUserDetailFunction:getUserDetailFunction,
    deleteFriendFullTaskFunction:deleteFriendFullTaskFunction,
    getAllFriendTasksFunction:getAllFriendTasksFunction,
    addFriendTaskFunction:addFriendTaskFunction,
    addFriendSubTaskFunction:addFriendSubTaskFunction,
    editFriendTaskFunction:editFriendTaskFunction,
    editFriendSubTaskFunction:editFriendSubTaskFunction

}