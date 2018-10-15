const express = require('express');
const router = express.Router();
const userController = require("./../../app/controllers/userController");
const appConfig = require("./../../config/appConfig")
const auth=require('./../middlewares/auth');

module.exports.setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}/user`;

    app.post(`${baseUrl}/signup`, userController.signUpFunction); 
    /**
 * @apiGroup user
 * @apiVersion 0.0.1
 * @api {post} /api/v1/user/signup to create new user
 * 
 * @apiParam {string} firstName first name of the user.(body params)(required)
 * @apiParam {string} lastName last name of the user.(body params)(required)
 * @apiParam {string} email email id of the user.(body params)(required)
 * @apiParam {number} mobileNumber mobileNumber of the user.(body params)(required)
 * @apiParam {strign} country user's country name.(body params)(required)
 * @apiParam {string} password password of the user.(body params)(required)
 * 
 * @apiSuccess {object} apiResponse shows error status, message, http status code, result.
 * 
 * @apiSuccessExample {object} Success-response:
 * {
    "error": false,
    "message": "User created",
    "status": 200,
    "data": {
        "userId": "kauJhCLvW",
        "firstName": "sherul",
        "lastName": "patel",
        "friendList":[],
        "activated": false,
        "country": "IN",
        "email": "sherulpatel@gmail.com",
        "mobileNumber": "8087977048",
        "recoveryPassword": "",
        "_id": "5ba7340ad080cb0ac34a117e",
        "__v": 0
   }       }
   @apiErrorExample {json} Error-Response:
   {
    "error": true,
    "message": "User Already Present With this Email",
    "status": 403,
    "data": null
    }
 */
    app.post(`${baseUrl}/resetPassword`,userController.resetPasswordFunction);
    /**
 * @apiGroup user
 * @apiVersion 0.0.1
 * @api {post} /api/v1/user/resetPassword to reset user's password
 * 
 * @apiParam {string} email email id of the user.(body params)(required)
 * 
 * @apiSuccess {object} apiResponse shows error status, message, http status code, result.
 * 
 * @apiSuccessExample {object} success-response:
    {
    "error": false,
    "message": "Password reset Successfully",
    "status": 200,
    "data": {
        "error": false,
        "message": "Password reset successfully",
        "status": 200,
        "data": {
            "n": 1,
            "nModified": 1,
            "ok": 1
        }
    }
}
@apiErrorExample {json} error-response:
{
    "error": true,
    "message": "no user found",
    "status": 404,
    "data": null
}
 */
    app.post(`${baseUrl}/updatePassword`,userController.updatePasswordFunction);
    /** 
 * @apiGroup user
 * @apiVersion 0.0.1
 * @api {post} /api/v1/user/updatePassword to update user's password
 * 
 * @apiParam {string} recoveryPassword recoveryPassword of the user.(body params)(required)
 * @apiParam {string} password new password of the user.(body params)(required)
 * 
 * @apiSuccess {object} apiResponse shows error status, message, http status code, result.
 * 
 * @apiSuccessExample {object} success-response:
{
    "error": false,
    "message": "Password Update Successfully",
    "status": 200,
    "data": {
        "error": false,
        "message": "Password Updated successfully",
        "status": 200,
        "data": {
            "n": 1,
            "nModified": 1,
            "ok": 1
        }
    }
}
@apiErrorExample {json} error-response:
{
    "error": true,
    "message": "No User Details Found",
    "status": 404,
    "data": null
}
 */
    app.post(`${baseUrl}/login`, userController.loginFunction);
/**
 * @apiGroup user
 * @apiVersion 0.0.1
 * @api {post} /api/v1/user/login to login user
 * 
 * @apiParam {string} email email id of the user.(body params)(required)
 * @apiParam {string} password password of the user.(body params)(required)
 * 
 * @apiSuccess {object} apiResponse shows error status, message, http status code, result.
 * 
 * @apiSuccessExample {object} success-response:
 * {
    "error": false,
    "message": "Login Successful",
    "status": 200,
    "data": {
        "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6IkJ6cHhMMnhEaiIsImlhdCI6MTUzOTA3OTk1NjQxMSwiZXhwIjoxNTM5MTY2MzU2LCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJ0b2RvbGlzdCIsImRhdGEiOnsidXNlcklkIjoiZlZZdFl1ZkxJIiwiZmlyc3ROYW1lIjoiYXNoaXNoIiwibGFzdE5hbWUiOiJwYXRlbCIsInVzZXJOYW1lIjoiYXNoaXNoIHBhdGVsIiwiZnJpZW5kTGlzdCI6W3siaWQiOiJHWXZSZm1lY3UiLCJuYW1lIjoiYXNoaXNoIG1hbmd1a2l5YSIsImFjdGl2ZSI6InRydWUifV0sImVtYWlsIjoiYXNoaXNobWFuZ3VraXlhcG1AZ21haWwuY29tIiwiY291bnRyeSI6IklOIiwibW9iaWxlTnVtYmVyIjo5MTg0NDY2ODA2NDgsImFjdGl2YXRlZCI6dHJ1ZSwicmVjb3ZlcnlQYXNzd29yZCI6IiJ9fQ.GP5cU6IRgKibOaXgk0-k6KvfnommwUJuLuV02KA1srw",
        "userDetails": {
            "userId": "fVYtYufLI",
            "firstName": "ashish",
            "lastName": "patel",
            "userName": "ashish patel",
            "friendList": [
                {
                    "id": "GYvRfmecu",
                    "name": "ashish mangukiya",
                    "active": "true"
                }
            ],
            "email": "ashishmangukiyapm@gmail.com",
            "country": "IN",
            "mobileNumber": 918446680648,
            "activated": true,
            "recoveryPassword": ""
        }
    }
}
@apiErrorExample {json} error-response:
{
    "error": true,
    "message": "no user detail found",
    "status": 404,
    "data": null
}
 */
    app.post(`${baseUrl}/logout`,auth.isAuthorized, userController.logout);
    /**
 * @apiGroup user
 * @apiVersion 0.0.1
 * @api {post} /api/v1/user/logout to logout user
 * 
 * @apiParam {string} authToken authToken of the user.(body params)(required)
 * 
 * @apiSuccess {object} apiResponse shows error status, message, http status code, result.
 * 
 * @apiSuccessExample {object} success-response:
{
    "error": false,
    "message": "Logged Out Successfully",
    "status": 200,
    "data": null
}
@apiErrorExample {json} error-response:
{
    "error": true,
    "message": "Already Logged Out or Invalid User",
    "status": 404,
    "data": null
}
*/
    app.post(`${baseUrl}/verify/account`,userController.accountVerify);
/**
 * @apiGroup user
 * @apiVersion 0.0.1
 * @api {post} /api/v1/user/verify/account to verify user's account
 * 
 * @apiParam {string} userId  userId of the user.(body params)(required)
 * @apiParam {string} secretId secretId of the user.(body params)(required)
 * 
 * @apiSuccess {object} apiResponse shows error status, message, http status code, result.
 * 
 * @apiSuccessExample {object} success-response:
{
    "error": false,
    "message": "account verified",
    "status": 200,
    "data": {
        "n": 1,
        "nModified": 1,
        "ok": 1
    }
}
@apiErrorExample {object} error-response:
{
    "error": true,
    "message": "detail not found",
    "status": 500,
    "data": null
}
*/    

}
