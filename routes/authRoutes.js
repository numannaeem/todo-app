const { getUser } = require("../controllers/getUserController");
const { Login } = require("../controllers/loginController");
const { Logout } = require("../controllers/logoutController");
const { Register } = require("../controllers/registerController");

module.exports = (app) => {
    app.post('/login', Login)
    app.post('/register',Register)
    app.get('/getUser',getUser)
    app.get('/logout',Logout)
}