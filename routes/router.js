const express = require("express");
const { Add } = require("../controllers/addController");
const { Delete } = require("../controllers/deleteController");
const { Edit } = require("../controllers/editController");
const { getData } = require("../controllers/getDataController");

const router = express.Router();

router.get('/',(req,res) => {
    return res.end("Owned by Numan Naeem.")
})

router.get('/items',getData);
router.post('/add',Add);
router.post('/edit',Edit);
router.post('/delete',Delete);

module.exports = {router};