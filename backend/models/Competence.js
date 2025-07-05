const mongoose = require('mongoose');

const competenceSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
    trim: true,
  },
  sousCompetences: [{
    type: String
  }],
  evaluations: [{
    utilisateur: String,
    note: Number
  }]
}, { timestamps: true });

const CompModel = mongoose.model('Competence', competenceSchema);

module.exports = CompModel
