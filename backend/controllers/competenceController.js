const Competence = require('../models/Competence');

// Lister toutes les compétences
exports.getAll = async (req, res) => {
  try {
    const competences = await Competence.find();
    res.json(competences);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Créer une compétence
exports.create = async (req, res) => {
  const { nom, sousCompetences, evaluations } = req.body;

  try {
    // Créer une nouvelle compétence en incluant les champs optionnels si présents
    const nouvelleCompetence = new Competence({
      nom,
      sousCompetences: sousCompetences || [],
      evaluations: evaluations || []
    });

    await nouvelleCompetence.save();
    res.status(201).json(nouvelleCompetence);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
};


// Mettre à jour les évaluations d’une compétence
exports.updateEvaluations = async (req, res) => {
  const { id } = req.params;
  const { utilisateur, note } = req.body;

  try {
    const competence = await Competence.findById(id);
    if (!competence) {
      return res.status(404).json({ message: 'Compétence non trouvée' });
    }

    competence.evaluations.push({ utilisateur, note });
    await competence.save();

    res.json(competence);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
