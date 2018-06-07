//Controller for our user comments

const db = require("../models");

module.exports = {
    // Find Our Comments
    find: function(req, res) {
        db.Comments
        .find({ _userId: req.params.id })
        .sort({ date: -1 })
        .then(function(dbComments){
            res.json(dbComments);
        });
    },
    // Create A New Comment
    create: function(req, res) {
        db.Comments.create(req.body).then(function(dbComments) {
            res.json(dbComment);
        });
    },
    // Delete A Comment With A Given ID
    delete: function(req, res) {
        db.Comments.remove({ _id: req.params.id }).then(function(dbComment) {
            res.json(dbComment);
        });
    } 
}