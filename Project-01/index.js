const express  = require("express");
const users = require("./MOCK_DATA.json");
const mongoose = require("mongoose")
const fs = require("fs");
const app = express();
const PORT = 8000;
//connection 
mongoose
.connect('url')
.then(()=>console.log("mongoDB Connected"))
.catch(err=>console.log("Mongo Error", err))
//schema 
const userSchema = new mongoose.Schema({
    firstName:{
        type:String, 
        required: true,
    },
    lastName:{
        type:String, 
      
    },
    email:{
        type:String, 
        required: true,
        unique:true,
    },
    jobTitle:{
        type:String, 
        required: true,
    },
    firstName:{
        type:String, 
    },
    gender:{
        type:String, 
    },
   
},{timestamps: true});
//model
const user = mongoose.model("user",userSchema);
// middleware - plugin 
app.use(express.urlencoded({extended:false}));
app.use(express.json()); // 👈 allows JSON body parsing
app.use((req ,res, next)=>{
    fs.appendFile(
        "log.txt",
        `\n${Date.now()}: ${req.method} : ${req.path}`,
        (err ,data)=>{
            next();
        }
    );
});

// REST API 

// Get all users
app.get("/api/users",(req,res)=>{
    console.log(req.headers)
    return res.json(users);
});

// Get user by id
app.get("/api/users/:id",(req,res)=>{
    const id = Number(req.params.id);
    const user = users.find((user)=>user.id === id);

    if (!user) {
        return res.status(404).json({error: "User not found"});
    }
    return res.json(user);
});

// HTML user list
app.get("/users",(req ,res)=>{
    const html = `
    <ul>
    ${users.map((user)=>`<li>${user.first_name}</li>`).join("")}
    </ul>
    `;
    res.send(html);
});

// Create new user
app.post("/api/users",(req,res)=>{
    const body = req.body;
    users.push({...body, id: users.length+1});

    fs.writeFile("./MOCK_DATA.json",JSON.stringify(users,null,2),(err)=>{
        if (err) {
            return res.status(500).json({status:"error", message:"Failed to save user"});
        }
        return res.json({status:"success",id: users.length});
    });
});

// Update user (PATCH)
app.patch("/api/users/:id",(req,res)=>{
    const id = Number(req.params.id);
    const body = req.body;

    const userIndex = users.findIndex((user)=>user.id === id);
    if (userIndex === -1) {
        return res.status(404).json({error: "User not found"});
    }

    // Update only provided fields
    users[userIndex] = {...users[userIndex], ...body};

    fs.writeFile("./MOCK_DATA.json",JSON.stringify(users,null,2),(err)=>{
        if (err) {
            return res.status(500).json({status:"error", message:"Failed to update user"});
        }
        return res.json({status:"success",user: users[userIndex]});
    });
});

// Delete user
app.delete("/api/users/:id",(req,res)=>{
    const id = Number(req.params.id);

    const userIndex = users.findIndex((user)=>user.id === id);
    if (userIndex === -1) {
        return res.status(404).json({error: "User not found"});
    }

    const deletedUser = users.splice(userIndex,1); // remove from array

    fs.writeFile("./MOCK_DATA.json",JSON.stringify(users,null,2),(err)=>{
        if (err) {
            return res.status(500).json({status:"error", message:"Failed to delete user"});
        }
        return res.json({status:"success",deletedUser});
    });
});

app.listen(PORT,() => console.log(`🚀 Server Started at PORT : ${PORT}`));
