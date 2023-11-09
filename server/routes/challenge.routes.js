const ChallengeController = require("../controllers/challenge.controller")
const { authenticate } = require('../config/jwt.config');

module.exports = (app) => {
    app.post('/api/challenges', ChallengeController.createNewChallenge)
    app.get('/api/challenges', ChallengeController.getAllChallenges)
    // app.get('/api/challenges/:id', authenticate, ChallengeController.getOneChallenge)
    // app.patch('/api/challenges/:id', authenticate, ChallengeController.updateChallenge)
    // app.delete('/api/challenges/:id', authenticate, ChallengeController.deleteChallenge)
}

