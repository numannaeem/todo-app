const express = require("express");
const cors = require('cors');
const mongoose  = require("mongoose");
const { router } = require("./routes/router");

const app = express()

app.use(cors());
app.use(express.json());    //optional, used to manage if request is in a different encoding
app.use(router);

mongoose.connect('mongodb+srv://numan:nothing@clusterx.ptuxk.mongodb.net/to-do?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false 
}, (err) => {
    if(err)
        console.log(err)
})

app.listen(process.env.PORT || 5000,(err) => {
    if(!err) {
        console.log("Started listening at 5000");
    }
    else {
        console.log(err);
    }
})
