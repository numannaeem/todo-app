const Item = require('../models/item');

const getData = async (req, res) => {
    const data = await Item.find({username:req.user.username})
    data.sort((a,b) => a.dueDate<b.dueDate?-1:1)
    return res.end(JSON.stringify(data))
}

module.exports = {getData}