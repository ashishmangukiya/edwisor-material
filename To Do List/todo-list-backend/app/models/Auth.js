const mongoose=require('mongoose');
const time = require('../libs/timeLib')

const schema=mongoose.Schema;

let auth=new schema({

    userId:{
        type:String,
        default:'',
        index:true,
        unique:true
    },
    authToken:{
        type:String,
        default:''
    },
    tokenSecret:{
        type:String,
        default:'',
    },
    tokenGenerationTime:{
        type:Date,
        default:time.now()
    }

})

module.exports=mongoose.model('Auth',auth);

