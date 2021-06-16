const { getUser } = require("../controllers/getUserController");
const { Login } = require("../controllers/loginController");
const { Logout } = require("../controllers/logoutController");
const { Register } = require("../controllers/registerController");

module.exports = (app) => {
    app.post('/api/login', Login)
    app.post('/api/register',Register)
    app.get('/api/getUser',getUser)
    app.get('/api/logout',Logout)
}