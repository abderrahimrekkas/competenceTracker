const express = require('express');
const router = express.Router();
const {
  getAll,
  create,
  updateEvaluations
} = require('../controllers/competenceController');
const { deleteMany } = require('../models/Competence');

router.get('/', getAll);
router.post('/', create);
router.put('/:id/evaluations', updateEvaluations);

module.exports = router; 