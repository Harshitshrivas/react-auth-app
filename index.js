console.log("Hello");
const { log } = require("console");
//file Systemmm
// let fs = require('fs');
// console.log(fs);
// fs.writeFileSync('index.txt', "Hello how are you...")
// let data =  fs.readFileSync('index.txt')
// console.log(data.toString());
// fs.appendFileSync('index.txt', " I am Harshit")
//fs.unlinksync('index.txt');

// operating system information
// let os = require('os');
// console.log(os.version());
// console.log(os.type());
// console.log(os.hostname());
//npx nodemon start

//How to create a Server
// let express = require('express')
// let app = express();

//It is like bodyguard
// app.use('/', (req, res)=>{
//    res.send("Maii huu naaa")
// })

// app.use('/', (req, res,next)=>{
//     res.send("Heloooo guyssss ")
//     next();
// })

// app.get('/:id', (req, res)=>{
//     let data = req.params.id
//     res.send(`Hello  ${data}`)
// })

// let arr = ['cat', 'dog', 'tiger', 'lion', 'cat', 'dog', 'tiger', 'lion']
// app.get('/:ani', (req, res)=>{
//     let {ani} = req.params;
//     let data = arr.filter((a)=>{
//         return a === ani;
//     })

//     res.send(data)
// })

// let arr = ['Harshit Shrivas', 'Ankit Shrivas', 'Ankush Shrivas', 'Anurag Shrivas', 'Harshit Shrivas', 'Ankit Shrivas', 'Harsh Tiwari']

//     app.get('/name', (req, res)=>{
//         let {Firstname, Lastname} = req.query;

//         res.send(`Firstname: ${Firstname}  Lastname: ${Lastname}`)
//     })

// app.get('/', (req, res)=>{
//  res.send("Hello Server chalaaaa")
// })
// app.get('/home', (req, res)=>{
//  res.send("Hello Server Home ka andar challaaa")
// })

//Fine bana ka save krna and read krna
// const express = require('express');
// const fs = require('fs');
// const app = express();

// app.get('/save', (req, res) => {
//   const { name } = req.query;
//   if (!name) return res.send('Please provide a name in query!');
//   fs.appendFileSync('names.txt', name + '\n');
//   res.send(`Name "${name}" saved successfully!`);
// });

// app.get('/show', (req, res) => {
//   if (!fs.existsSync('names.txt')) return res.send('No names found!');
//   const data = fs.readFileSync('names.txt', 'utf8');
//   res.send(`<pre>${data}</pre>`);
// });

// app.listen(4000, () => {
//   console.log('Server running on http://localhost:4000');
// });
// http://localhost:4000/save?name=Harshuuu

// app.listen(4000, ()=>{
//     console.log("Server  Running on port 4000");
// })

let express = require("express");
let mongoose = require("mongoose");

let User = require("./user");
let bcrypt = require("bcrypt");
let app = express();

// cors..
let cors = require("cors");
app.use(cors());

app.use(express.json());
mongoose.connect("mongodb://127.0.0.1:27017/5thSem").then(() => {
  console.log("db conneted...");
});

app.get("/", (req, res) => {
  res.send("hiii");
});
app.post("/create", async (req, res) => {
  let { userName, email, passWord } = req.body;
  console.log(userName, email, "heheh");

  let user = await User.findOne({ email });
  console.log(user, "hiiii");

  if (user) {
    res.send("user jinda haiii");
  }
  let updatedP = await bcrypt.hash(passWord, 10);
  console.log(updatedP, "HEH");

  let userData = new User({
    userName,
    email,
    passWord: updatedP,
  });
  await userData.save();
  res.send("account ban gya hai....");
  //   console.log(userName,email, passWord);
});

app.post("/login", async (req, res) => {
  let { email, passWord } = req.body;

  let userInfo = await User.findOne({ email });
  console.log(userInfo, "kyaa milegaaaaaaaa");

  if (!userInfo) {
    return res.json({ success: false, message: "user not foundddd" });
  } else {
    let validPass = await bcrypt.compare(passWord, userInfo.passWord);
    if (validPass) {
      return res.json({ success: true, message: "login ho gyaa" });
    } else {
      return res.json({ success: false, message: "pass sahi nhi haiiii" });
    }
  }
});

app.listen(4000, () => {
  console.log("server running on port no 4000");
});

// http://localhost:4000/create
