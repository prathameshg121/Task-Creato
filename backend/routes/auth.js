// const router = require("express").Router();
// const User = require("../models/user.model");

// router.route("/login").post((req, res) => {
//     const { email, password } = req.body;

//     // Find or create a new user and send it as response
//     User.findOne({ email: email })
//         .then((foundUser) => {
//             if (foundUser) {
//                 res.json(foundUser);
//             } else {
//                 const newUser = new User({
//                     email: email,
//                     password: password,
//                 });
//                 newUser
//                     .save()
//                     .then(() =>
//                         User.findOne({
//                             email: email,
//                         }).then((foundNewUser) => res.json(foundNewUser))
//                     )
//                     .catch((err) => res.status(400).json("Error: " + err));
//             }
//         })
//         .catch((err) => res.status(400).json("Error : " + err));
// });

// module.exports = router;



const express = require('express')
const User = require('../models/user.model')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const router = express.Router();

router.post("/signup", (req, res, next) => {
    console.log("signup : "+ res);
    bcrypt.hash(req.body.password, 10).then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
      });

      User.findOne({email:req.body.email}).then(user1=>{
        if(user1){
          return res.status(401).json({
            message: "User Already Exist"
          })
        }

        user.save().then(result => {
          if(!result){
            return res.status(500).json({
              message: "Error Creating USer"
            })
          }
          console.log('signup result : '+ result);
          res.status(201).json({
            message: "User created!",
            result: result
          });
      })
        })   
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });;
    })
   
  });


  router.post("/login", (req, res, next) => {
    let fetchedUser;
    console.log("login email :"+req.body.email);
    User.findOne({email:req.body.email}).then(user=>{
      if(!user){
        return res.status(401).json({
          message: "Auth failed no such user"
        })
      }
      fetchedUser=user;
      console.log('user : '+user);
      return bcrypt.compare(req.body.password, user.password);
    }).then(result=>{
      console.log(fetchedUser)
      if(!result){
        return res.status(401).json({
          message: "Auth failed inccorect password"
        })
      }
      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id },
        "secret",
        { expiresIn: "24h" }
      );
      res.status(200).json({
        token: token,
        expiresIn: 86400,
        userId: fetchedUser._id
      });
    })
    .catch(e=>{
     
      console.log(e)
    
    })
  })
module.exports = router