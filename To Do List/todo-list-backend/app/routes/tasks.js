const controller=require('./../controllers/taskController');
const express = require('express');
const config=require('./../../config/appConfig');
const auth=require('./../middlewares/auth');
let setRouter=(app)=>{
    let baseUrl=config.apiVersion;
app.post(baseUrl+'/get/all/tasks',auth.isAuthorized,controller.getAllTasksFunction);
/**
 * @apiGroup task
 * @apiVersion 0.0.1
 * @api {post} /api/v1/get/all/tasks to get all created tasks of user
 * 
 * @apiParam {string} userId userId of user.(body params)(required)
 * @apiParam {string} authToken authToken of user.(body params)(required) 
 * 
 * @apiSuccess {object} apiResponse shows error status, message, http status code, result.
 * 
 * @apiSuccessExample {object} Success-response:
 * {
    "error": false,
    "message": "task detail found",
    "status": 200,
    "data": [
        {
            "taskId": "cUKSN1m2j",
            "taskTitle": "meeting at midnight",
            "taskList": [
                {
                    "id": "VD6jlCnAJ",
                    "taskName": "one",
                    "completed": false,
                    "subTaskList": [
                        {
                            "subTaskId": "BP-_OfbhK",
                            "subTaskName": "two",
                            "subTaskCompleted": false,
                            "_id": "5bbc80aa01ffc62040b8e9da"
                        }
                    ],
                    "_id": "5bbc80a001ffc62040b8e9d9"
                }
            ],
            "userId": "fVYtYufLI",
            "userName": "ashish patel",
            "completed": false,
            "createdOn": "2018-10-09T10:18:43.066Z",
            "private": false,
            "_id": "5bbc809101ffc62040b8e9d8",
            "__v": 0
        }
    ]
}
 @apiErrorExample {json} Error-Response:
   {
    "error": true,
    "message": "Failed To find tasks",
    "status": 403,
    "data": null
    }
 */
app.post(baseUrl+'/get/all/friendsRequest',auth.isAuthorized,controller.getAllfriendsRequestFunction);
/**
 * @apiGroup friend-request
 * @api {post} /api/v1/get/all/friendRequest to get all friend request
 * 
 * @apiParam {string} userId userId of user.(body params)(required)
 * @apiParam {string} authToken authToken of user.(body params)(required) 
 * 
 * @apiSuccess {object} apiResponse shows error status, message, http status code, result.
 * 
 * @apiSuccessExample {object} Success-response:
  * {
    "error": false,
    "message": "friend request list found",
    "status": 200,
    "data": [
        {
            "requestId": "KakKzn8vu",
            "senderId": "GYvRfmecu",
            "senderName": "ashish mangukiya",
            "recieverId": "fVYtYufLI",
            "recieverName": "ashish patel",
            "active": false,
            "_id": "5bbc819c01ffc62040b8e9dd",
            "__v": 0
        }
    ]
}
 @apiErrorExample {json} Error-Response:
   {
    "error": true,
    "message": "Failed To find friends request",
    "status": 403,
    "data": null
    }
 */
app.post(baseUrl+'/get/user/detail',auth.isAuthorized,controller.getUserDetailFunction);
/**
 * @apiGroup task
 * @api {post} /api/v1/get/user/detail to get user's detail
 * 
 * @apiParam {string} userId userId of user.(body params)(required)
 * @apiParam {string} authToken authToken of user.(body params)(required) 
 * 
 * @apiSuccess {object} apiResponse shows error status, message, http status code, result.
 * 
 * @apiSuccessExample {object} Success-response:
 * {
    "error": false,
    "message": "user found",
    "status": 200,
    "data": [
        {
            "userId": "fVYtYufLI",
            "firstName": "ashish",
            "lastName": "patel",
            "userName": "ashish patel",
            "friendList": [],
            "email": "ashishmangukiyapm@gmail.com",
            "country": "IN",
            "mobileNumber": 918446680648,
            "activated": true,
            "createdOn": "2018-10-09T08:42:11.000Z",
            "recoveryPassword": "",
            "_id": "5bbc69e38e41011eacf279b3",
            "__v": 0
        }
    ]
}
@apiErrorExample {json} Error-Response:
   {
    "error": true,
    "message": "Failed To find user detail",
    "status": 403,
    "data": null
    }
 */
app.post(baseUrl+'/get/all/friend/tasks',auth.isAuthorized,controller.getAllFriendTasksFunction);
/**
 * @apiGroup task
 * @api {post} /api/v1/get/all/friend/tasks to get all friend's tasks
 * 
 * @apiParam {string} userId userId of friend.(body params)(required)
 * @apiParam {string} authToken authToken of user.(body params)(required) 
 * 
 * @apiSuccess {object} apiResponse shows error status, message, http status code, result.
 * 
 * @apiSuccessExample {object} Success-response:
 * {
    "error": false,
    "message": "task detail found",
    "status": 200,
    "data": [
        {
            "taskId": "UObWsTbh7",
            "taskTitle": "one",
            "taskList": [
                {
                    "id": "7A1ub8KfM",
                    "taskName": "two",
                    "completed": false,
                    "subTaskList": [
                        {
                            "subTaskId": "ciDy13z1m",
                            "subTaskName": "three",
                            "subTaskCompleted": false,
                            "_id": "5bbc83d701ffc62040b8e9e1"
                        }
                    ],
                    "_id": "5bbc83ce01ffc62040b8e9e0"
                }
            ],
            "userId": "GYvRfmecu",
            "userName": "ashish mangukiya",
            "completed": false,
            "createdOn": "2018-10-09T10:32:33.753Z",
            "private": false,
            "_id": "5bbc83c701ffc62040b8e9df",
            "__v": 0
        }
    ]
}
@apiErrorExample {json} Error-Response:
   {
    "error": true,
    "message": "Failed To find friend tasks",
    "status": 403,
    "data": null
    }
 */
app.post(baseUrl+'/delete/friend/full/task',auth.isAuthorized,controller.deleteFriendFullTaskFunction);
/**
  * @apiGroup task
 * @api {post} /api/v1/delete/friend/full/task to delete friend's full-task
 * 
 * @apiParam {string} taskId taskId of friend's task.(body params)(required)
 * @apiParam {string} authToken authToken of user.(body params)(required) 
 * 
 * @apiSuccess {object} apiResponse shows error status, message, http status code, result.
 * 
 * @apiSuccessExample {object} Success-response:
 * {
    "error": false,
    "message": "task deleted",
    "status": 200,
    "data": {
        "n": 1,
        "ok": 1
    }
}
@apiErrorExample {json} Error-Response:
   {
    "error": true,
    "message": "Failed To delete friend task",
    "status": 403,
    "data": null
    }
 */

app.post(baseUrl+'/add/friend/task',auth.isAuthorized,controller.addFriendTaskFunction);
/**
  * @apiGroup task
 * @api {post} /api/v1/add/friend/task to add friend's task
 * 
 * @apiParam {string} taskId taskId of friend's task .(body params)(required)
 * @apiParam {string} taskName taskName of friend's task .(body params)(required)
 * @apiParam {string} authToken authToken of user.(body params)(required) 
 * 
 * @apiSuccess {object} apiResponse shows error status, message, http status code, result.
 * 
 * @apiSuccessExample {object} Success-response:
 
 * {
    "error": false,
    "message": "task added",
    "status": 200,
    "data": {
        "n": 1,
        "nModified": 1,
        "ok": 1
    }
}
 */
app.post(baseUrl+'/add/friend/sub/task',auth.isAuthorized,controller.addFriendSubTaskFunction);
/**
 * @apiGroup task
 * @api {post} /api/v1/add/friend/sub/task to add friend's sub-task
 * 
 * @apiParam {string} id id of friend's task .(body params)(required)
 * @apiParam {string} subTaskName subTaskName of friend's sub-task .(body params)(required)
 * @apiParam {string} authToken authToken of user.(body params)(required) 
 * 
 * @apiSuccess {object} apiResponse shows error status, message, http status code, result.
 * 
 * @apiSuccessExample {object} Success-response:
 * {
    "error": false,
    "message": "sub-task added",
    "status": 200,
    "data": {
        "n": 1,
        "nModified": 1,
        "ok": 1
    }
}
 */
app.post(baseUrl+'/edit/friend/task',auth.isAuthorized,controller.editFriendTaskFunction);
/**
 * @apiGroup task
 * @api {post} /api/v1/edit/friend/task to edit friend's task
 * 
 * @apiParam {string} id id of friend's task .(body params)(required)
 * @apiParam {string} taskName taskName of friend's task .(body params)(required)
 * @apiParam {string} authToken authToken of user.(body params)(required) 
 * 
 * @apiSuccess {object} apiResponse shows error status, message, http status code, result.
 * 
 * @apiSuccessExample {object} Success-response:

 * {
    "error": false,
    "message": "task edited",
    "status": 200,
    "data": {
        "n": 1,
        "nModified": 1,
        "ok": 1
    }
}
 */
app.post(baseUrl+'/edit/friend/sub/task',auth.isAuthorized,controller.editFriendSubTaskFunction);
/**
 * @apiGroup task
 * @api {post} /api/v1/edit/friend/sub/task to edit friend's sub-task
 * 
 * @apiParam {string} id id of friend's task .(body params)(required)
 * @apiParam {string} subTaskId subTaskId of friend's sub-task .(body params)(required) 
 * @apiParam {string} subTaskName subTaskName of friend's sub-task .(body params)(required)
 * @apiParam {string} authToken authToken of user.(body params)(required) 
 * 
 * @apiSuccess {object} apiResponse shows error status, message, http status code, result.
 * 
 * @apiSuccessExample {object} Success-response:
 * {
    "error": false,
    "message": "sub-task edited",
    "status": 200,
    "data": {
        "n": 6,
        "nModified": 0,
        "ok": 1
    }
}
 */


}

module.exports={
    setRouter:setRouter
}