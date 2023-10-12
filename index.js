require("./db/Config");
const express = require('express');
const app = express();
const User = require("./db/User");
const Data = require('./db/Data');
const cors = require('cors');


app.use(express.json());
app.use(cors());

app.post("/signup", async(req,resp)=>{
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    resp.send(result);

});


app.post("/login",async(req,resp)=>{
    if(req.body.password && req.body.email){
        let user = await User.findOne(req.body).select("-password")
        if(user){
            resp.send(user)
            console.log(user)
        }
        else{
            resp.send({result:"No User Found"})
        }
    }
    else{
        resp.send({result:"No User Found"})
    }
});

app.post("/addcontact", async(req,resp)=>{
    let data = new Data(req.body);
    let result = await data.save()
    resp.send(result); 
});

app.get("/datalist",async(req,resp)=>{
    let data = await Data.find();
    if(data.length>0){
        resp.send(data)
    }
    else{
        resp.send({result:"No data found"})
    }
});

app.delete("/data/:id", async(req,resp)=>{
    const data  = await Data.deleteOne({id:req.params._id})
    resp.send(data)
});

app.get("/data/:id",async(req,resp)=>{
    let result = await Data.findOne({_id:req.params.id})
    if(result){
        resp.send(result)
    }else{
        resp.send({result:"No data found"})
    }

});

app.put("/data/:id", async(req,resp)=>{
    let result = await Data.updateOne(
        {_id:req.params.id},
        {
            $set: req.body
        }
    )

    resp.send(result)
});

app.get("/search/:key", async(req,resp)=>{
    let result = await Data.find({
        "$or":[
            {name:{$regex:req.params.key}}
        ]
    })
    resp.send(result)
});

app.listen(5000);