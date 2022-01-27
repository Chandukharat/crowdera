const cors=require('cors')
require('dotenv').config()
const express = require("express")
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SECRET_KEY)
const app = express()
const multer = require('multer')
require("./db/conn")
const Regi = require("./models/Regi")
const bcrypt = require ("bcryptjs")
const path = require("path");



 
 const port = 8001;
 app.use(cors())
app.use(express.json());
app.use('/uploads', express.static('uploads'));




const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req,file,cb)=> {
        cb(null, file.originalname )
    }
})
  
  const upload = multer({ storage:storage })





  



  app.put("/verify/:id", (async(req,res)=>{

    try{

    await Regi.findByIdAndUpdate(req.params.id, {isVerified:true});

    res.status(200).send({message:"Email Verified Success"})
    }catch(e){

        res.status(400).send({message:"Email verificaion Failed"})

    }
    
        
}))

app.post ("/Regi", upload.single('file'), async (req,res)=>{ 
  
    const p = req.body.Password
    const cp = req.body.Confirm 
    const file = req.file.filename;

  
    
     if(p===cp){  
         
         const xyz = await new Regi({Email:req.body.Email, username:req.body.username, Phone:req.body.Phone, Age:req.body.Age, Password:req.body.Password, Confirm:req.body.Confirm, file:req.file.filename });
        
        xyz.save().then(()=>{
            const id = xyz._id;

            const msg = {
                to: req.body.Email, 
                from: 'vijayshankarkharat1111@gmail.com', 
                subject: 'Sending with SendGrid is Fun',
                text: 'and easy to do anywhere, even with Node.js',
                html:`<a href=http://localhost:3000/verify/${id}>Verify</a>`,
              }

            sgMail
.send(msg)
.then((response) => {
  console.log(response[0].statusCode)
  console.log(response[0].headers)
  res.send("verification Link sent to Email")
})
.catch((error) => {
  console.error(error)
  res.send("failed to send verification Link")
})
            res.status(201).send(xyz);
        }).catch((e)=>{res.send(e)})
    }
     else{
        alert('passwords are not matching')}})

        app.post ("/login", async (req,res)=>{

            try{
            
            const Email = req.body.Email
            const p =  req.body.Password
            const Usermail = await Regi.findOne({Email:Email})
            const isMatch = await bcrypt.compare(p,Usermail.Password)
            console.log(Usermail.Password)
            console.log(isMatch)
            
        
           
            if(isMatch){
        
                console.log(Usermail.isVerified)
        
                if (!Usermail.isVerified) {
        
                    res.status(300).send({message:"User is not Verified"})
                    
                }else{
        
                    res.status(200).send({message:"login Successfuly", Usermail})
        
                }
               
            }else{
                res.status(304).send({message:"login Failed"})
               
            }
        
        }catch{
            res.status(400).send({message:"User Not REgistered"})
        
        }
        
        })
        

 app.listen (port,()=>{
    console.log(`connection is setup at ${port}`)
})