//Controller for our user Reply

const db = require("../models");

module.exports = {
    // Find Our Reply
    find: function(req, res) {
        db.Reply
        .find({ _userId: req.params.id })
        .sort({ date: -1 })
        .then(function(dbReply){
            res.json(dbReply);
        });
    },
    // Create A New Reply
    create: function(req, res) {
        db.Reply.create(req.body).then(function(dbReply) {
            res.json(dbReply);
        });
    },
    // Delete A Reply With A Given ID
    delete: function(req, res) {
        db.Reply.remove({ _id: req.params.id }).then(function(dbReply) {
            res.json(dbReply);
        });
    } 
}