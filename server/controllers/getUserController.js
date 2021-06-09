const getUser = (req,res) => {
    if(req.user)
        return res.json(req.user.username)
    else return res.status(404).send({message:'No user logged in'})
}

module.exports = { getUser }