const AuthorController = require('../controllers/authors.controllers');

module.exports = app => {
    app.get('/api/authors', AuthorController.findAllAuthors);
    app.get('/api/author/:id', AuthorController.findOneAuthor);
    app.put('/api/author/:id', AuthorController.updateAuthor);
    app.post('/api/author', AuthorController.createNewAuthor);
    app.delete('/api/author/:id', AuthorController.deleteOneAuthor);
}