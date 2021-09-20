const Author = require('../models/authors.models');

module.exports.findAllAuthors = (req, res) => {
    Author.find()
        .then(allAuthors => {
            res.json({ message: 'all authors-->', authorData: allAuthors })
        })
        .catch(err => {
            res.json({ message: 'Not loading authorData ~ time to debug', error: err })
        });
}

module.exports.findOneAuthor = (req, res) => {
    Author.findOne({ _id: req.params.id })
        .then(oneAuthor => {
            res.json({ message: 'one author -->', authorData: oneAuthor })
        })
        .catch(err => {
            res.json({ message: 'Not loading authorData ~ time to debug', error: err })
        });
}

module.exports.createNewAuthor = (req, res) => {
    Author.create(req.body)
        .then(newAuthor => {
            res.json({ message: 'new author created -->', authorData: newAuthor })
        })
        .catch(err => {
            res.json({ message: 'Not creating new author ~ time to debug', error: err })
        });
}

module.exports.updateAuthor = (req, res) => {
    Author.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true, runValidators: true }
    )
        .then(updatedAuthor => {
            res.json({ message: 'product updated-->', authorData: updatedAuthor })
        })
        .catch(err => {
            res.json({ message: 'Not updating author ~ time to debug', error: err })
        });
}

module.exports.deleteOneAuthor = (req, res) => {
    Author.deleteOne({ _id: req.params.id })
        .then(result => {
            res.json({ message: 'deleted one author successfully', result: result })
        })
        .catch(err => {
            res.json({ message: 'something went wrong with delete ~ debug', error: err })
        });
}