const Item = require('../models/item');

const Edit = async (req, res) => {
    var editedItem = req.body
    await Item.findByIdAndUpdate(editedItem._id,editedItem,{new: true},(err,doc) => {
        if(err) throw new Error("At edit: "+ err.message)
    })
    const data = await Item.find()
    data.sort((a,b) => a.dueDate<b.dueDate?-1:1)
    return res.end(JSON.stringify(data))
}

module.exports = {Edit}