const Athlete = require('../models/athlete.model');

class AthleteController {
    /**
     * Lister tous les athletes
     */
    async list(req, res) {
        const athletes = await Athlete.find();

        res.json({
            count: athletes.length,
            athletes: athletes
        });
    }

    /**
     * Chercher un athlete avec son id
     */
    async getById(req, res) {
        const id = req.params.id;
        const athlete = await Athlete.findById(id);

        res.json(athlete);
    }
    
    /**
     * Ajouter un athlete
     */
    async add(req, res) {
        const athleteParams = req.body;
        const athlete = new Athlete({

            firstName: athleteParams.firstName,
            lastName: athleteParams.lastName,
            gender: athleteParams.gender,
            country: athleteParams.country 
        })
        await athlete.save();
        res.json(athlete);
    }

}

module.exports = AthleteController;