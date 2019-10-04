var mongoose = require('mongoose');

//Savea reference to the Schema constructor
var Schema = mongoose.Schema;

// using the schema constructor, create a new NoteSchema object
var NoteSchema = new Schema({
    body: String
});

// This creates our model from the above schema, using mongoose's model method
var Note = mongoose.model('Note', NoteSchema);

// Export the Note model
module.exports = Note;
