const express = require("express");
const cors = require('cors');
const mongoose  = require("mongoose");
const { router } = require("./routes/router");
const passport = require('passport')
const session = require('express-session')

const app = express()

app.use(cors({
    origin: process.env.NODE_ENV === "production" ? 'https://numan-todo.netlify.app':'http://localhost:3000',
    credentials:true
}));
app.use(express.urlencoded({extended: true}))
app.set("trust proxy", 1);
app.use(session({
    secret: 'imanopenbook',
    proxy: true,
    resave: true,
    saveUninitialized: true,
    cookie: {
        sameSite: process.env.NODE_ENV === "production" ? 'none' : 'lax',
        secure: process.env.NODE_ENV === "production"
    }
}))
app.use(express.json());    //used to parse json requests
app.use(passport.initialize())
app.use(passport.session())
require('./passportConfig')(passport)
app.use(router);
require('./routes/authRoutes')(app)

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


