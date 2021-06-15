const express = require("express");
const { Add } = require("../controllers/addController");
const { Delete } = require("../controllers/deleteController");
const { Edit } = require("../controllers/editController");
const { getData } = require("../controllers/getDataController");
const { getUser } = require("../controllers/getUserController");
const { Logout } = require("../controllers/logoutController");
const { Register } = require("../controllers/registerController");

const router = express.Router();

router.get('/',(req,res) => {
    return res.end("To-do app by Numan Naeem")
})

router.get('/items',getData);
router.post('/add',Add);
router.post('/edit',Edit);
router.post('/delete',Delete);
router.post('/register',Register)
router.get('/getUser',getUser)
router.get('/logout',Logout)
// router.post('/login',Login)


module.exports = {router};