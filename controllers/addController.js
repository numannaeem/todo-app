const Item = require('../models/item');

const Add = async (req, res) => {
    const newItem = {...req.body, username:req.user.username}
    await Item.create(newItem)
    const data = await Item.find({username:req.user.username})
    data.sort((a,b) => a.dueDate<b.dueDate?-1:1)
    return res.end(JSON.stringify(data))
}

module.exports = {Add}