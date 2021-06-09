const passport = require("passport")

const Login = (req,res,next) => {
    passport.authenticate('local',(err,user) => {
        if(err) throw err
        if (!user) res.send("No user exists")
        else {
            req.logIn(user, err => {
                if(err) throw err
                res.send("Succesfully authenticated")
                console.log("Succesfully authenticated")
            })
        }
    })(req,res,next)
}

module.exports = {Login}