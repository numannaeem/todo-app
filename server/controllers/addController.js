const Item = require('../models/item');

const Add = async (req, res) => {
    const newItem = req.body
    let doc = await Item.create(newItem)
    const data = await Item.find()
    data.sort((a,b) => a.dueDate<b.dueDate?-1:1)
    return res.end(JSON.stringify(data))
}

module.exports = {Add}