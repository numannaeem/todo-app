const Item = require('../models/item');

const Edit = async (req, res) => {
    if(!req.user) return res.status(404).send("No user logged in")
    var editedItem = { ...req.body, username:req.user.username }
    await Item.findByIdAndUpdate(editedItem._id,editedItem,{new: true},(err,doc) => {
        if(err) throw new Error("At edit: "+ err.message)
    })
    const data = await Item.find({username:req.user.username})
    data.sort((a,b) => a.dueDate<b.dueDate?-1:1)
    return res.end(JSON.stringify(data))
}

module.exports = {Edit}