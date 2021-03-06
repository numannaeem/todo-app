const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean,
    dueDate: Date,
    username: String
})

const Item = mongoose.model('Item', ItemSchema);

module.exports = Item;