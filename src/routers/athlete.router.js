const express = require('express');
const router = express.Router();

const AthleteController = require('../controllers/athlete.controller');
const athleteController = new AthleteController();

router.get('/athletes', async (req, res) => {
    athleteController.list(req, res);
});

router.post('/athletes', async (req, res) => {
    athleteController.add(req, res);
});

router.get('/athletes/:id', async  (req, res) => {
    athleteController.getById(req,res);
})

module.exports = router;