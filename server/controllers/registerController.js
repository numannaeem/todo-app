const User = require('../models/user');
const bcrypt = require('bcryptjs')

const Register = (req, res) => {
    User.findOne({username: req.body.username}, async (err, doc) => {
        try {
            if(err) throw err
            if(doc) return res.status(401).send({message:"User already exists"})
            if(!doc) {
                const hashedPassword = await bcrypt.hash(req.body.password, 10)
                await User.create({username: req.body.username, password: hashedPassword})
                res.status(200).json("Succesfully registered")
            }
        }
        catch(err) {
            console.log(err)
        }
    })
}

module.exports = {Register}