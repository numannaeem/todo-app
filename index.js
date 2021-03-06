const express = require("express");
const cors = require('cors');
const mongoose  = require("mongoose");
const { router } = require("./routes/router");
const passport = require('passport')
const session = require('express-session')
const path = require('path')

const app = express()

app.use(express.static(path.resolve(__dirname,"./client/build")));

app.use(express.urlencoded({extended: true}))

app.use(session({
    secret: 'imanopenbook',
    resave: true,
    saveUninitialized: true
}))
app.use(express.json());    //used to parse json requests
app.use(passport.initialize())
app.use(passport.session())
require('./passportConfig')(passport)
app.use(router);
require('./routes/authRoutes')(app)

app.use((req, res, next) => {
    res.sendFile(path.resolve(__dirname, "./client/build","index.html"));
  });  

mongoose.connect('mongodb+srv://numan:nothing@clusterx.ptuxk.mongodb.net/to-do?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false 
}, (err) => {
    if(err)
        console.log(err)
})

app.listen(process.env.PORT || 5000,(err) => {
    if(!err) {
        console.log("Server up!");
    }
    else {
        console.log(err);
    }
})


