const express = require('express');
const router = express.Router();

const SportController = require('../controllers/sport.controller');
const sportController = new SportController();

router.get('/sports/', async (req, res) => {
    sportController.list(req, res);
});

router.get('/sports/:id', async (req, res) => {
    sportController.listbyId(req, res);
});

router.get('/sports/:id/athletes', async (req, res) => {
    sportController.listAthletes(req, res);
});

router.post('/sports', async (req, res) => {
    sportController.AddSport(req, res);
});

router.put('/sports/:idSport/athletes/:idAthlete', async (req, res) => {
    sportController.AddAthleteToSport(req, res); 
  });
// ... A COMPLETER ...

module.exports = router;
