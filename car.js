const mogoose = require('mongoose');

const carSchema = mongoose.Schema({
    modele :  {type : String},
    marque :  {type : String},
    description : {type : String}, 
})
module.exports = mogoose.model('car', carSchema);