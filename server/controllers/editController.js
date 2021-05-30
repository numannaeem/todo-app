const Item = require('../models/item');

const Edit = async (req, res) => {
    var editedItem = req.body
    await Item.findByIdAndUpdate(editedItem._id,editedItem,{new: true},(err,doc) => {
        if(err) throw new Error("At edit: "+ err.message)
    })
    return res.end("Edited succesfully")
}

module.exports = {Edit}