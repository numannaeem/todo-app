const Logout = (req,res) => {
    if(req.user) {
        const {username} = req.user
        req.logout()
        return res.json({ok: true, message:`${username} logged out`})
    }
    else return res.json({message:'No user logged in'})
}

module.exports = {Logout}