const mongoose = require("mongoose")

const { Schema } = mongoose;

const ficheSchema = new Schema({
  name: {type: String, required:true},
  mail: {type: String, required:true},
  question: {type: String, required:true},
  answer: {type: String, required:true},
  type: {type: String, requireed:true, enum: ['Ordre de grandeur', 'Conversion', 'Dates et évènements', 'Définitions', 'Infos importantes']},
});

module.exports = mongoose.model('fiche', ficheSchema)