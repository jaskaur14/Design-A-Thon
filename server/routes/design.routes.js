const DesignsController = require('../controllers/design.controller');

module.exports = (app) => {
    app.get('/api/designs', DesignsController.findAllDesigns);
    app.get('/api/designs/:id', DesignsController.findOneDesign);
    app.patch('/api/designs/:id', DesignsController.updateExistingDesign);
    app.post('/api/designs', DesignsController.createNewDesign);
    app.delete('/api/designs/:id', DesignsController.deleteAnExistingDesign);
}
