const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const bcrypt = require('bcrypt');
    const app =express();
    app.use(express.json());
    app.use(cors({
        origin: 'http://localhost:3000', // Allow requests from this origin
        methods: ['POST', 'GET', 'OPTIONS'], // Allowed methods
        allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
        credentials: true, // Allow credentials (e.g., cookies)
      }));

    mongoose.connect("mongodb://127.0.0.1:27017/Exclusive", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Established a connection to the database"))
    .catch(err => console.log("Something went wrong when connecting to the database", err));

    const userSchema = new mongoose.Schema({
        name: String,
        email: String,
        password: String,
        role: String
    });
    const User = mongoose.model("Registers", userSchema);

    app.post("/register", (req, res) => {
      console.log(req.body);
      const {name, email, password, role} = req.body;
      bcrypt.hash(password, 10)
      .then(hash => {
        User.create({name, email, password: hash, role})
        .then(user => {
            console.log("Data stored:", user);
            res.status(201).send("User registered successfully"); // Respond to the frontend
        })
      })
          .catch(err => {
              console.error(err);
              res.status(500).send("Error storing user data"); // Handle error response
          });
  });

  app.post("/login",async (req,res)=>{
try{
  console.log(req.body);
  const {email,password}=req.body;
  const user=await User.findOne({email});
  console.log("Finding USer");
  if(!user){
    console.log("User not found");
    return res.status(404).send("User not found");
    }
    console.log("Finding Pass");
    const isValidPassword=await bcrypt.compare(password,user.password);
    if(!isValidPassword){
      console.log("Invalid password");
    return res.status(401).send("Invalid password");
    }
    console.log("User logged in");
    res.send("Login successful");
    }
catch(error){
console.log(error);
res.status(500).send("Error logging in");
}
  });


    app.get("/", (req, res) => {
        res.send('Backend is running');
    })


      
      // Start the server
      const PORT = 3001;
      app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
      });