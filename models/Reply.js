const mongoose = require("mongoose");

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
const ReplySchema = new Schema({
    // `user` is required and type of string
    _userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    // `_commentId` is required and of type string
    _commentId: {
        type: Schema.Types.ObjectId,
        ref: "Comments"
    },
    // `title` is required and of type String
    heading: {
        type: String,
        required: true,
    },
    // 'paragraph' is required and a type of String
    paragraph: {
        type: String,
        required: true
    },
    // Save the date so that replies are sorted  
    date: {
        type: Date,
        default: Date.now
    }
});

// This creates our model from the above schema, using mongoose's model method
const Reply = mongoose.model("reply", ReplySchema);

// Export the Article model
module.exports = Reply;