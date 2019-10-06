var mongoose = require('mongoose');

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
var UserSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    link: {
        type: String,
        required: true
    },
    // 'notes' is an array that stores ObjectIds
    // The ref property links these ObjectIds to the Note model
    // This allows us to populate the User with any associated Notes
    notes: [
        {
            // Store ObjectIds in the array
            type: Schema.Types.ObjectId,
            ref: 'Note'
        }
    ]
});

// This creates our model from the above schema, using mongoose's model method
var User = mongoose.model('User', UserSchema);

// Export the User model
module.exports = User;