const DesignsController = require('../controllers/design.controller')
const { authenticate } = require('../config/jwt.config')
const multer = require("multer");
const { memoryStorage } = require("multer");
const storage = memoryStorage()
const upload = multer ({storage});

module.exports = (app) => {
    app.get('/api/alldesigns', DesignsController.findAllDesigns);
    app.post('/api/designs', upload.single('image'), DesignsController.createNewDesign)
    // app.get('/api/designs/:id', DesignsController.findOneDesign);
    // app.patch('/api/designs/:id', DesignsController.updateExistingDesign);
    // app.post('/api/designs', upload.single('image'), DesignsController.createNewDesign);
    // app.delete('/api/designs/:id', DesignsController.deleteAnExistingDesign);
}
