const passport = require('passport')

const Login = (req,res,next) => {
    passport.authenticate('local',(err,user,info) => {
        if(err) return next(err)
        if (!user) return res.status(401).send({"ok":false, info})
        req.logIn(user, err => {
            if(err) return next(err)
            return res.send({"ok": true});
        })

    })(req,res,next)
}

module.exports = {Login}