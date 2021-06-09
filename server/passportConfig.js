const User = require('./models/user');
const localStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')

module.exports = (passport) => {
    passport.use(
        new localStrategy((username,password,done) => {
            User.findOne({username}, (err,user) => {
                if(err) throw err
                if(!user) return done(null,false, {message:"User doesn't exist"})
                bcrypt.compare(password, user.password, (err,result) => {
                    if(err) throw err
                    if(result) return done(null, user)
                    else return done(null,false, {message:"Incorrect password"})
                })
            })
        })
    )
    passport.serializeUser((user,done) => {
        done(null,user.id)
    })

    passport.deserializeUser((userId, done) => {
        User.findById(userId, (err,user) => {
            done(err,user)
        })
    })
} 


