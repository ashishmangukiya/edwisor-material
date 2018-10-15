const socketio = require('socket.io');
const mongoose = require('mongoose');
const shortid = require('shortid');
const logger = require('./loggerLib');
const events=require('events');
const eventEmitter=new events.EventEmitter();
const tokenLib = require("./tokenLib");
const check = require("./checkLib");
const response = require('./responseLib')
const time = require('./timeLib');
const redisLib = require("./redisLib");
const emailLib = require('../libs/emailLib');
const taskModel=mongoose.model('Task');
const UserModel = mongoose.model('User');
const taskHistoryModel=mongoose.model('taskHistory')
const subTaskHistoryModel=mongoose.model('subTaskHistory')
const requestModel=mongoose.model('friendRequest')
let setServer=(server)=>{

    let io=socketio.listen(server);
    let myio=io.of('/');

    myio.on('connection',(socket)=>{
        socket.emit('verify-user','verified');

        socket.on('set-user',(AuthToken)=>{
            tokenLib.verifyClaimWithoutSecret(AuthToken,(err,Detail)=>{
                if(err){
                    socket.emit('error-message',{status:500,message:'error occured while verifying authtoken'})
           
                }
                else{
                let userInfo=Detail.data;
                    let userId=userInfo.userId;
                    let userName=userInfo.firstName+''+userInfo.lastName;
                    socket.userId=userId;
                    for(let friend of Detail.data.friendList){
                        if(friend.active){
                            socket.join(friend.id);
                        }
                    }
                    redisLib.setANewOnlineUserInHash('onlineUsers',userId,userName,(err,userList)=>{
                        if(err){
                            socket.emit('error-message',{status:500,message:'error occured while adding user in online-list'})
                        }
                        else{
                            redisLib.getAllUsersInAHash('onlineUsers',(err,allOnlineUsers)=>{ 
                                if(err){
                                    socket.emit('error-message',{status:500,message:'error occured while getting users from online-list'})
                                }
                                else{
                                socket.join('todolist');
                                myio.to('todolist').emit('online-user-list',allOnlineUsers);    
                                }     
                             })
                        }
                    })

                    
                
            }
            
            })
        })
        socket.on('disconnect',()=>{

            if(socket.userId){

                redisLib.deleteUserFromHash('onlineUsers',socket.userId);
                redisLib.getAllUsersInAHash('onlineUsers',(err,allOnlineUsers)=>{ 
                    if(err){
                        socket.emit('error-message',{status:500,message:'error occured while getting users from online-list'})

                    }
                    else{
                    socket.leave('todolist');
                    myio.to('todolist').emit('online-user-list',allOnlineUsers);
                    }
                })

            }

        })

        socket.on('create-task',(userDetail)=>{
            userDetail.taskId=shortid.generate();

            taskModel.find({taskId:userDetail.taskId},(err,result)=>{
                if(err){
                    socket.emit('error-message',{status:500,message:'failed to create new task'})
                }
                else if(check.isEmpty(result)){
                    let newTask=new taskModel({
                        taskId:userDetail.taskId,
                        taskTitle:userDetail.taskTitle,
                        taskList:[],
                        userId:userDetail.userId,
                        userName:userDetail.userName,
                        completed:userDetail.completed,
                        createdOn:userDetail.createdOn,
                        private:userDetail.private
                    })

                    newTask.save((err,detail)=>{
                            if(err){
                                socket.emit('error-message',{status:500,message:'failed to save task detail'})
                            }
                            else {
                                socket.emit('get-update',detail);
                            }
                    })
                }
                else{
                    socket.emit('error-message',{status:500,message:'task already created with this taskId'})
                }
            })
        })
        socket.on('delete-full-task',(taskId)=>{
            taskModel.deleteOne({taskId:taskId},(err,result)=>{
                if(err){
                    socket.emit('error-message',{status:500,message:'failed to delete task'})
                }
                else if(check.isEmpty(result)){
                    socket.emit('error-message',{status:500,message:'task detail not found'})                    
                }
                else{
                    socket.emit('get-update',result);
                }

            })
    

        })
        socket.on('delete-task',(data)=>{
            taskModel.update({'taskList.id':data.task.id},{$pull:{'taskList':{'id':data.task.id}}},(err,result)=>{

                if(err){
                    socket.emit('error-message',{status:500,message:'failed to delete new task'})                    
                }
                else if(check.isEmpty(result)){
                    socket.emit('error-message',{status:500,message:'task detail not found'})                    
                }
                else{
                    taskHistoryModel.find({taskId:data.taskId},(err,result)=>{

                        if(err){
                            socket.emit('error-message',{status:500,message:'failed to save task detail in undo list'})                    
                        }
                        else if(check.isEmpty(result)){
                            let newData=new taskHistoryModel({
                                taskId:data.taskId,
                                task:data.task,
                                createdOn:new Date()
                            })
                            newData.save((err,result)=>{
                                if(err){
                                    socket.emit('error-message',{status:500,message:'failed to save task detail'})
                                }
                                else{
                                    socket.emit('get-update',result);
                                }
                            })
                        
                        }
                        else{
                            let newData=new taskHistoryModel({
                                taskId:data.taskId,
                                task:data.task,
                                createdOn:new Date()
                            })
                            newData.save((err,result)=>{
                                if(err){
                                    socket.emit('error-message',{status:500,message:'failed to save task detail'})
                                }
                                else{
                                    socket.emit('get-update',result);
                                }
                            })                            
                        }
                    })


                }

            })
    

        })
        socket.on('delete-friend-task',(data)=>{
            taskModel.update({'taskList.id':data.task.id},{$pull:{'taskList':{'id':data.task.id}}},(err,result)=>{

                if(err){
                    socket.emit('error-message',{status:500,message:'failed to delete friend task'})                    
                }
                else if(check.isEmpty(result)){
                    socket.emit('error-message',{status:500,message:'friend task detail not found'})                    
                }
                else{
                    taskHistoryModel.find({taskId:data.taskId},(err,result)=>{

                        if(err){
                            socket.emit('error-message',{status:500,message:'failed to add friend task detail in history list'})                    
                        }
                        else if(check.isEmpty(result)){
                            let newData=new taskHistoryModel({
                                taskId:data.taskId,
                                task:data.task,
                                createdOn:new Date()
                            })
                            newData.save((err,result)=>{
                                if(err){
                                    socket.emit('error-message',{status:500,message:'failed to save friend task'})                    
                                }
                                else{
                                    let info={
                                        message:data.message,
                                        userId:data.userId,
                                        mainId:data.mainId
                                    }
                                    socket.room=data.userId;
                                    socket.to(socket.room).broadcast.emit('friend-notify',info);
                                    socket.emit('friend-notify',info)
                                }
                            })
                        
                        }
                        else{
                            let newData=new taskHistoryModel({
                                taskId:data.taskId,
                                task:data.task,
                                createdOn:new Date()
                            })
                            newData.save((err,result)=>{
                                if(err){
                                    socket.emit('error-message',{status:500,message:'failed to save friend task'})                    
                                }
                                else{
                                    let info={
                                        message:data.message,
                                        userId:data.userId,
                                        mainId:data.mainId
                                    }
                                    socket.room=data.userId;
                                    socket.to(socket.room).broadcast.emit('friend-notify',info);
                                    socket.emit('friend-notify',info)                                }
                            })                            
                        }
                    })


                }

            })
    

        })
        socket.on('delete-friend-sub-task',(task)=>{
            taskModel.update({'taskList.subTaskList.subTaskId':task.subTask.subTaskId},{$pull:{'taskList.$.subTaskList':{'subTaskId':task.subTask.subTaskId}}},(err,result)=>{

                if(err){
                    socket.emit('error-message',{status:500,message:'failed to delete friend sub task'})                    
                }
                else{
                subTaskHistoryModel.find({'subTaskId':task.id},(err,result)=>{
                    if(err){
                        socket.emit('error-message',{status:500,message:'failed to add friend sub-task'})                    
                    }
                    else if(check.isEmpty(result)){
                        let data=new subTaskHistoryModel({
                            subTaskId:task.id,
                            subTask:task.subTask,
                            createdOn:new Date()  
                        })

                        data.save((err,result)=>{
                            if(err){
                                socket.emit('error-message',{status:500,message:'failed to save friend task'})                    
                            }
                            else{
                                let info={
                                    message:task.message,
                                    userId:task.userId,
                                    mainId:task.mainId
                                }
                                socket.room=task.userId;
                                socket.to(socket.room).broadcast.emit('friend-notify',info);
                                socket.emit('friend-notify',info)                       
                            }
                        })
                    }
                    else{
                        let data=new subTaskHistoryModel({
                            subTaskId:task.id,
                            subTask:task.subTask,
                            createdOn:new Date()  
                        })

                        data.save((err,result)=>{
                            if(err){
                                socket.emit('error-message',{status:500,message:'failed to save friend task'})                    
                            }
                            else{
                                let info={
                                    message:task.message,
                                    userId:task.userId,
                                    mainId:task.mainId
                                }
                                socket.room=task.userId;
                                socket.to(socket.room).broadcast.emit('friend-notify',info);
                                socket.emit('friend-notify',info)
                            }
                        })
                    }
                })    
                }
            })
        })   
        
        socket.on('delete-sub-task',(task)=>{
            taskModel.update({'taskList.subTaskList.subTaskId':task.subTask.subTaskId},{$pull:{'taskList.$.subTaskList':{'subTaskId':task.subTask.subTaskId}}},(err,result)=>{

                if(err){
                    socket.emit('error-message',{status:500,message:'failed to delete sub task'})                    
                }
                else{
                subTaskHistoryModel.find({'subTaskId':task.id},(err,result)=>{
                    if(err){
                        socket.emit('error-message',{status:500,message:'failed to find sub task detail'})                    
                    }
                    else if(check.isEmpty(result)){
                        let data=new subTaskHistoryModel({
                            subTaskId:task.id,
                            subTask:task.subTask,
                            createdOn:new Date()  
                        })

                        data.save((err,result)=>{
                            if(err){
                                socket.emit('error-message',{status:500,message:'failed to save sub task'})                    
                            }
                            else{
                                socket.emit('get-update',''); 
                            }
                        })
                    }
                    else{
                        let data=new subTaskHistoryModel({
                            subTaskId:task.id,
                            subTask:task.subTask,
                            createdOn:new Date()  
                        })

                        data.save((err,result)=>{
                            if(err){
                                socket.emit('error-message',{status:500,message:'failed to save sub task'})                    
                            }
                            else{
                                socket.emit('get-update',''); 
                            }
                        })
                    }
                })    
                }
            })
        })   
        
        socket.on('undo-task',(taskId)=>{
            taskHistoryModel.findOneAndRemove({'taskId':taskId},{sort:{'createdOn':-1}},(err,result)=>{
                if(err){
                    socket.emit('error-message',{status:500,message:'failed to undo task'})                    
                }
                else if(check.isEmpty(result)){
                    socket.emit('error-message',{status:500,message:'undo list is empty '})                    
                }
                else{
                    taskModel.update({'taskId':taskId},{$push:{'taskList':result.task}},{multi:true},(err,result)=>{
                        if(err){
                            socket.emit('error-message',{status:500,message:'failed to retrieve deleted task'})                    
                        }
                        else if(check.isEmpty(result)){
                            socket.emit('error-message',{status:500,message:'task detail not found '})                    
                        }
                        else{
                            socket.emit('get-update',result);   
                        }
                    })
                }
            })
        })
        socket.on('undo-sub-task',(taskId)=>{
            subTaskHistoryModel.findOneAndRemove({'subTaskId':taskId},{sort:{'createdOn':-1}},(err,result)=>{
                if(err){
                    socket.emit('error-message',{status:500,message:'failed to undo sub-task'})                    
                }
                else if(check.isEmpty(result)){
                    socket.emit('error-message',{status:500,message:'undo list is empty '})                    
                }
                else{
                    taskModel.update({'taskList.id':taskId},{$push:{'taskList.$[i].subTaskList':result.subTask}},{arrayFilters:[{'i.id':taskId}],multi:true},(err,result)=>{
                        if(err){
                            socket.emit('error-message',{status:500,message:'failed to retrieve deleted sub-task'})                    
                        }
                        else if(check.isEmpty(result)){
                            socket.emit('error-message',{status:500,message:'task detail not found '})                    
                        }
                        else{
                            socket.emit('get-update',result);   
                        }
                    })
                }
            })
        })
        socket.on('undo-friend-task',(data)=>{
            taskHistoryModel.findOneAndRemove({'taskId':data.taskId},{sort:{'createdOn':-1}},(err,result)=>{
                if(err){
                    socket.emit('error-message',{status:500,message:'failed to undo friend task'})                    
                }
                else if(check.isEmpty(result)){
                    socket.emit('error-message',{status:500,message:'undo list is empty '})                    
                }
                else{
                    taskModel.update({'taskId':data.taskId},{$push:{'taskList':result.task}},{multi:true},(err,value)=>{
                        if(err){
                            socket.emit('error-message',{status:500,message:'failed to retrieve deleted friend task'})                    
                        }
                        else if(check.isEmpty(value)){
                            socket.emit('error-message',{status:500,message:'task detail not found '})                    
                        }
                        else{
                            let info={
                                message:`'${result.task.taskName}' task of '${data.name}' has been recovered by ${data.userName} `,
                                userId:data.userId,
                                mainId:data.mainId
                            }
                            socket.room=data.userId;
                            socket.to(socket.room).broadcast.emit('friend-notify',info);
                            socket.emit('friend-notify',info)
                        }
                    })
                }
            })
        })
        socket.on('undo-friend-sub-task',(data)=>{
            subTaskHistoryModel.findOneAndRemove({'subTaskId':data.id},{sort:{'createdOn':-1}},(err,result)=>{
                if(err){
                    socket.emit('error-message',{status:500,message:'failed to undo friend sub-task'})                    
                }
                else if(check.isEmpty(result)){
                    socket.emit('error-message',{status:500,message:'undo list is empty '})                    
                }
                else{
                    taskModel.update({'taskList.id':data.id},{$push:{'taskList.$[i].subTaskList':result.subTask}},{arrayFilters:[{'i.id':data.id}],multi:true},(err,value)=>{
                        if(err){
                            socket.emit('error-message',{status:500,message:'failed to retrieve deleted friend sub-task'})                    
                        }
                        else if(check.isEmpty(value)){
                            socket.emit('error-message',{status:500,message:'task detail not found '})                    
                        }
                        else{
                            let info={
                                message:`'${result.subTask.subTaskName}' sub-task of '${data.name}' has been recovered by ${data.userName} `,
                                userId:data.userId,
                                mainId:data.mainId
                            }
                            socket.room=data.userId;
                            socket.to(socket.room).broadcast.emit('friend-notify',info);
                            socket.emit('friend-notify',info)                        }
                    })
                }
            })
        })
        socket.on('completed-task',(data)=>{
            taskModel.update({'taskList.id':data.id},{$set:{'taskList.$.completed':true}},{multi:true},(err,result)=>{

                if(err){
                    socket.emit('error-message',{status:500,message:'error occured while marking task as completed '})                    
                }
                else if(check.isEmpty(result)){
                    socket.emit('error-message',{status:500,message:'task detail not found '})                    
                }
                else{
                    socket.emit('get-update',result);
                }

            })
        })
        socket.on('completed-sub-task',(data)=>{
            taskModel.update({},{$set:{"taskList.$[i].subTaskList.$[j].subTaskCompleted":true}},{arrayFilters:[{'i.id':data.id},{'j.subTaskId':data.subTaskId}],multi:true},(err,result)=>{
            if(err){
                socket.emit('error-message',{status:500,message:'error occured while marking sub-task as completed '})                    
            }
            else if(check.isEmpty(result)){
                socket.emit('error-message',{status:500,message:'sub-task detail not found '})                    
            }
            else{
                socket.emit('get-update',result);
            }

        })
    })
    socket.on('re-complete-task',(data)=>{
        taskModel.update({'taskList.id':data.id},{$set:{'taskList.$.completed':false}},{multi:true},(err,result)=>{

            if(err){
                socket.emit('error-message',{status:500,message:'error occured while marking task as not done '})                    
            }
            else if(check.isEmpty(result)){
                socket.emit('error-message',{status:500,message:'task detail not found '})                    
            }
            else{
                socket.emit('get-update',result);
            }

        })
    })
    socket.on('re-complete-sub-task',(data)=>{
        taskModel.update({},{$set:{'taskList.$[i].subTaskList.$[j].subTaskCompleted':false}},{arrayFilters:[{'i.id':data.id},{'j.subTaskId':data.subTaskId}],multi:true},(err,result)=>{

        if(err){
            socket.emit('error-message',{status:500,message:'error occured while marking sub-task as not done '})                    
        }
        else if(check.isEmpty(result)){
            socket.emit('error-message',{status:500,message:'sub-task detail not found '})                    
        }
        else{
            socket.emit('get-update',result);
        }

    })
})
        socket.on('add-task',(data)=>{
            taskModel.update({taskId:data.taskId},{$push:{'taskList':{'id':shortid.generate(),'taskName':data.taskName}}},(err,result)=>{

                if(err){
                    socket.emit('error-message',{status:500,message:'error occured while adding new task '})                    
                }
                else if(check.isEmpty(result)){
                    socket.emit('error-message',{status:500,message:'task detail not found '})                    
                }
                else{
                    socket.emit('get-update',result);
                }

            })
        })
        socket.on('add-sub-task',(data)=>{
            taskModel.update({'taskList.id':data.id},{$push:{'taskList.$[i].subTaskList':{'subTaskId':shortid.generate(),'subTaskName':data.subTaskName}}},{arrayFilters:[{'i.id':data.id}]},(err,result)=>{

                if(err){
                    socket.emit('error-message',{status:500,message:'error occured while adding new sub-task '})                    
                }
                else if(check.isEmpty(result)){
                    socket.emit('error-message',{status:500,message:'sub-task detail not found '})                    
                }
                else{
                    socket.emit('get-update',result);
                }

            })
        })
        socket.on('update-task',(data)=>{
            taskModel.update({'taskList.id':data.id},{$set:{'taskList.$.taskName':data.taskName}},{multi:true},(err,result)=>{

                if(err){
                    socket.emit('error-message',{status:500,message:'error occured while updating task '})                    
                }
                else if(check.isEmpty(result)){
                    socket.emit('error-message',{status:500,message:'task detail not found '})                    
                }
                else{
                    socket.emit('get-update',result);
                }

            })
        })
        socket.on('update-sub-task',(data)=>{
            taskModel.update({},{$set:{'taskList.$[i].subTaskList.$[j].subTaskName':data.subTaskName}},{arrayFilters:[{'i.id':data.id},{'j.subTaskId':data.subTaskId}],multi:true},(err,result)=>{

                if(err){
                    socket.emit('error-message',{status:500,message:'error occured while updating sub-task '})                    
                }
                else if(check.isEmpty(result)){
                    socket.emit('error-message',{status:500,message:'sub-task detail not found '})                    
                }
                else{
                    socket.emit('get-update',result);
                }

            })
        })
        socket.on('send-to-all-friend',(data)=>{
            socket.room=data.userId;
            socket.to(socket.room).broadcast.emit('friend-notify',data);
            socket.emit('friend-notify',data)
        })

        socket.on('search-user',(userName)=>{

            UserModel.find({userName:{$regex:userName}},(err,result)=>{
                if(err){
                    socket.emit('error-message',{status:500,message:'error occured while searching friend '})                    
                }
                else if(check.isEmpty(result)){
                    socket.emit('searched-result',result)
                }
                else{
                    socket.emit('searched-result',result)
                }
            })

        })

        socket.on('send-request',(data)=>{
            
            data.requestId=shortid.generate();
                requestModel.find({$and:[{senderId:data.recieverId},{recieverId:data.senderId},{active:false}]},(err,result)=>{

                    if(err){
                        socket.emit('error-message',{status:500,message:'failed to send friend request '})                    
                    }
                    else if(check.isEmpty(result)){
                        let requestDetail=new requestModel({
                            requestId:data.requestId,
                            senderId:data.senderId,
                            senderName:data.senderName,
                            recieverId:data.recieverId,
                            recieverName:data.recieverName
                        })
                        requestDetail.save((err,detail)=>{
                            if(err){
                                socket.emit('error-message',{status:500,message:'failed to save friend request '})                    
                            }
                            else{
                                UserModel.update({userId:data.senderId},{$push:{'friendList':{'id':data.recieverId,'name':data.recieverName,'active':'false'}}},(err,result)=>{
                                    if(err){
                                        socket.emit('error-message',{status:500,message:'failed to save friend request '})                    
                                    }
                                    else if(check.isEmpty(result)){
                                        socket.emit('error-message',{status:500,message:'user detail not found '})                    
                                    }
                                    else{
                                        socket.room=data.recieverId;
                                        socket.join(socket.room);
                                        socket.broadcast.emit(data.recieverId,result);
                                        socket.emit(data.senderId,result);
                                    }
                                })
                            }
                        })
                    }
                    else{
                        socket.emit('error-message',{status:500,message:data.recieverName+' has already sent you a friend request'})
                    }
                })       
        })

        socket.on('reject-request',(data)=>{

            requestModel.deleteOne({requestId:data.requestId},(err,result)=>{
                if(err){
                    socket.emit('error-message',{status:500,message:'failed to reject request  '})                    
                }
                else if(check.isEmpty(result)){
                    socket.emit('error-message',{status:500,message:'friend request detail not found  '})                    
                }
                else{
                    UserModel.update({userId:data.senderId},{$pull:{'friendList':{'id':data.recieverId}}},(err,result)=>{
                        if(err){
                            socket.emit('error-message',{status:500,message:'failed to delete friend detail'})                    
                        }
                        else if(check.isEmpty(result)){
                            socket.emit('error-message',{status:500,message:'friend detail not found '})                    
                        }
                        else{
                            socket.broadcast.emit(data.senderId,result);
                            socket.emit(data.recieverId,result);
                        }
                    })
                }

            })

        })
        socket.on('unfriend',(data)=>{

            UserModel.update({userId:data.friendId},{$pull:{'friendList':{'id':data.userId}}},(err,result)=>{
                if(err){
                    socket.emit('error-message',{status:500,message:'failed to Unfriend  '})                    
                }
                else if(check.isEmpty(result)){
                    socket.emit('error-message',{status:500,message:'friend detail not found '})                    
                }
                else{
                    UserModel.update({userId:data.userId},{$pull:{'friendList':{'id':data.friendId}}},(err,result)=>{
                        if(err){
                            socket.emit('error-message',{status:500,message:'failed to delete friend detail '})                    
                        }
                        else if(check.isEmpty(result)){
                            socket.emit('error-message',{status:500,message:'friend detail not found '})                    
                        }
                        else{
                            socket.leave(data.friendId);
                            socket.broadcast.emit(data.friendId,{'status':200});
                            socket.emit(data.userId,{'status':200});
                        }
                    })
                }
            })

        })

        socket.on('accepted-request',(data)=>{
            requestModel.update({$and:[{senderId:data.senderId},{recieverId:data.recieverId},{active:false}]},{active:true},(err,result)=>{
                if(err){
                    socket.emit('error-message',{status:500,message:'error occured while accepting friend request '})                    
                }
                else if(check.isEmpty(result)){
                    socket.emit('error-message',{status:500,message:'request detail not found '})                    
                }
                else{
                    UserModel.update({userId:data.recieverId},{$push:{'friendList':{'id':data.senderId,'name':data.senderName,'active':'true'}}},(err,result)=>{
                        if(err){
                            socket.emit('error-message',{status:500,message:'error occured while adding friend detail in list '})                    
                        }
                        else if(check.isEmpty(result)){
                            socket.emit('error-message',{status:500,message:'friend detail not found '})                    
                        }
                        else{
                             UserModel.update({$and:[{'friendList.id':data.recieverId},{userId:data.senderId}]},{$set:{'friendList.$.active':'true'}},(err,result)=>{
                                if(err){
                                    socket.emit('error-message',{status:500,message:'error occured while updating friend detail '})                    
                                }
                                else if(check.isEmpty(result)){
                                    socket.emit('error-message',{status:500,message:'friend detail not found '})                    
                                }
                                else{
                                socket.room=data.senderId;
                                socket.join(socket.room);
                                socket.broadcast.emit(data.senderId,result);
                                socket.emit(data.recieverId,result);
                                }
                    })
                        }
                    })
                }
            })
        })
    
    })

    
}















module.exports={
    setServer:setServer
}