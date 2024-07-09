const mongoose = require('mongoose');
const { type } = require('os');

const contactSchema = mongoose.Schema({
    nom : {type: String},

    prenom : {type: String},

    email : {type: String},

    adresse : {type: String},

    message : {type: String}
})


module.exports = mongoose.model("Contact", contactSchema);