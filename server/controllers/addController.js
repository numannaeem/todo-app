const fs = require('fs');
const Item = require('../models/item');

const Add = async (req, res) => {
    const newItem = req.body
    let doc = await Item.create(newItem)
    console.log(`${doc.title} added succesfully`)
    return res.end(`${doc.title} added succesfully`)
}

module.exports = {Add}