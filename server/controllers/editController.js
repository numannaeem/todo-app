const fs = require('fs');
const Item = require('../models/item');

const Edit = async (req, res) => {
    var editedItem = req.body
    await Item.findByIdAndUpdate(editedItem._id,editedItem,{new: true},(err,doc) => {
        if(err) console.log(err)
        else console.log(`${doc.title} edited`)
    })
    return res.end("Edited succesfully")
}

module.exports = {Edit}