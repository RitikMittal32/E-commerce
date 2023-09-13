const express = require('express');
const cors = require("cors");
require('./db/config');
const User = require('./db/User');
const app = express();
const Product = require('./db/Product')


const Jwt = require('jsonwebtoken');
const jwtKey = 'e-comm';


app.use(express.json())

app.use(cors());

app.post("/register", async (req,resp)=>{
       let user= new User(req.body);
       let result = await user.save();
       result = result.toObject();
       delete result.password;
       Jwt.sign({result},jwtKey,{expiresIn:"2h"},(err,token)=>{
              if(err){
                     resp.send({result : "something went wrong,Please try after some time"})
              }
              resp.send({result,auth : token})
       })
})

app.post('/login', async (req,resp)=>{
       console.log(req.body);

       if(req.body.password && req.body.email){
              let user = await User.findOne(req.body).select("-password");
              if(user){
                     Jwt.sign({user},jwtKey,{expiresIn:"2h"},(err,token)=>{
                            if(err){
                                   resp.send({result : "something went wrong,Please try after some time"})
                            }
                            resp.send({user,auth : token})
                     })
              }else{
                     resp.send({result:"No user find"})
              }
       }else{
              resp.send({result:"No user find"})

       }
         

})

app.post('/add-product', async (req,resp) => {
       let product = new Product(req.body);
       let result = await product.save();
       resp.send(result)
})

app.get("/products", async(req,resp)=>{
       let products = await Product.find();
       if(products.length>0){
              resp.send(products)
       }else{
           resp.send({result:"No product's found"})   
       }
})


app.delete('/product/:_id',async (req,resp)=>{
       try{
       resp.send(req.params.id);
       const result = await Product.deleteMany(req.params)
       resp.send("deleted successfully");
       }catch(error){
              console.error("Error detected")
       }
       
})

app.get("/product/:id", async (req,resp) => {
       let result = await Product.findOne({_id: req.params.id});
       resp.send(result);

})

app.put("/product/:id", async(req,resp)=> {
      let result = await Product.updateOne(
       {_id:req.params.id},
       {
              $set : req.body
       }
      )
      resp.send(result);
})

app.get("/search/:key", async (req,resp) => {
       let result = await Product.findOne({
            "$or":[
              {name : {$regex : req.params.key}},
              {company : {$regex : req.params.key}},
              {category: {$regex : req.params.key}},
              {price : {$regex : req.params.key}},

            ]  
            
       });
       resp.send(result);
})

app.listen(5000)
