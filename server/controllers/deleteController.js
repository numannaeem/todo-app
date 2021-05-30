const Item = require('../models/item');

const Delete = async (req, res) => {
    let {id} = req.body
    if(id) {
        await Item.findOneAndDelete({"_id": id},(err, item) => {
            if(err) throw err
        })
        return res.end("Deleted 1 item succesfully")
    }
    await Item.deleteMany({ completed: true }, (err) => {
        if(err) throw err
    })
    return res.end(`Deleted selected items succesfully`) 
}

module.exports = {Delete}