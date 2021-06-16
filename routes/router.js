const express = require("express");
const { Add } = require("../controllers/addController");
const { Delete } = require("../controllers/deleteController");
const { Edit } = require("../controllers/editController");
const { getData } = require("../controllers/getDataController");

const router = express.Router();

router.get('/api/items',getData);
router.post('/api/add',Add);
router.post('/api/edit',Edit);
router.post('/api/delete',Delete);

module.exports = {router};