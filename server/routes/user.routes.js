const UserController = require("../controllers/user.controller")

module.exports = (app) => {
    app.post('/api/registerUser', UserController.registerUser)
    app.post('/api/loginUser', UserController.loginUser)
    app.post('/api/logoutUser', UserController.logoutUser)
    // app.get('/api/users', UserController.getAllUsers)
    // app.get('/api/users/:id', UserController.getOneUser)
    // app.patch('/api/users/:id', UserController.updateUser)
    // app.delete('/api/users/:id', UserController.deleteUser)
}

