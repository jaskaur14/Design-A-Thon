const UserController = require("../controllers/user.controller")
const { authenticate } = require('../config/jwt.config')

module.exports = (app) => {
    app.post('/api/registerUser', UserController.registerUser)
    app.post('/api/loginUser', UserController.loginUser)
    app.post('/api/logoutUser', UserController.logoutUser)
    app.get('/api/users', UserController.getAllUsers)
    app.get('/api/users/:id', authenticate, UserController.getOneUser)
    app.patch('/api/users/:id', authenticate, UserController.updateUser)
    app.delete('/api/users/:id', UserController.deleteUser)
}

