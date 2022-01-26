const mongoose = require ('mongoose')
const bcrypt = require ("bcryptjs")






const RegiSchema = new mongoose.Schema({
    Email :{
        type : String ,
        

        required : true, 
    },
    username :{
        type : String ,
        

        required : true, 
    },
    Phone : {
        type : Number ,
        required : true, 
    },
    Age :{
        type : Number , 
        required : true,
    }, 

   Password : {
        type : String,
        required: true ,
    },
   Confirm : {
        type : String ,
        required: true ,
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    file:{
        type:String,
    
    }
    
})



RegiSchema.pre('save',async function(next){if(this.isModified("Password")){
    this.Password = await bcrypt.hash(this.Password, 10);
    this.Confirm= await bcrypt.hash(this.Password, 10);
}
   
next()
} )
const Regi = new mongoose.model('Regi', RegiSchema);
 
module.exports= Regi ;