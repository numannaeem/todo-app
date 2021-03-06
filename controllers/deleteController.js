const Item = require('../models/item');

const Delete = async (req, res) => {
    let {id} = req.body
    if(id) {
        await Item.findOneAndDelete({"_id": id},(err, item) => {
            if(err) throw err
        })
    }
    else {
        await Item.deleteMany({ completed: true, username:req.user.username }, (err) => {
            if(err) throw err
        })
    }
    const data = await Item.find({username:req.user.username})
    data.sort((a,b) => a.dueDate<b.dueDate?-1:1)
    return res.end(JSON.stringify(data))
}

module.exports = {Delete}