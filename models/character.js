const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CharacterSchema = new Schema({
    name: String,
    house: String,
    role: String,
});

module.exports = mongoose.model('Character', CharacterSchema);