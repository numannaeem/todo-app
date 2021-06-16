const getUser = (req,res) => {
    console.log(req.user)
    if(req.user)
        return res.json(req.user.username)
    return res.status(404).send({message:'No user logged in'})
}

module.exports = { getUser }