const express = require("express");
const cors = require('cors');
const mongoose  = require("mongoose");
const { router } = require("./routes/router");
const passport = require('passport')
const session = require('express-session')

const app = express()

app.use(cors({
    origin: process.env.NODE_ENV ==="production"? 'https://numan-todo.netlify.app':'http://localhost:3000',
    credentials:true
}));
app.use(express.urlencoded({extended: true}))
app.set("trust proxy", 1);
app.use(session({
    secret: 'imanopenbook',
    resave: true,
    saveUninitialized: true,
    cookie: {
        sameSite: process.env.NODE_ENV === "production" ? 'none' : 'lax',
        secure: process.env.NODE_ENV === "production"
    }
}))
app.use(express.json());    //used to parse the body
app.use(passport.initialize())
app.use(passport.session())
require('./passportConfig')(passport)
app.use(router);

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

app.post('/login', (req,res,next) => {
    passport.authenticate('local',(err,user,info) => {
        if(err) return next(err)
        if (!user) return res.status(401).send({"ok":false, info})
        req.logIn(user, err => {
            if(err) return next(err)
            return res.send({"ok": true});
        })

    })(req,res,next)
})
