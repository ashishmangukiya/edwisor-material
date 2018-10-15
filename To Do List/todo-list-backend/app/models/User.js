'use strict'
/**
 * Module Dependencies
 */
const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

let userSchema = new Schema({
  userId: {
    type: String,
    default: '',
    index: true,
    unique: true
  },
  firstName: {
    type: String,
    default: ''
  },
  lastName: {
    type: String,
    default: ''
  },
  userName:{
    type: String,
    default: ''
  },
  friendList:[],
  password: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    default: ''
  },
  country:{
    type:String,
    default:''
  },
  mobileNumber: {
    type: Number,
    default: 0
  },
  activated:{
    type:Boolean,
    default:false
  },
  accountVerification:{
    type:String,
    default:''
  },
  createdOn :{
    type:Date,
    default:""
  },
  recoveryPassword:{
    type:String,
    default:''
  }



})


mongoose.model('User', userSchema);