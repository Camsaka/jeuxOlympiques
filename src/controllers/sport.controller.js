const Sport = require('../models/sport.model');
const Athlete = require('../models/athlete.model');

class SportController {
    /**
     * Lister tous les sports
     */
    async list(req, res) {
        const sports = await Sport.find();

        res.json({
            count: sports.length,
            sports: sports
        });
    }

    async AddSport(req, res) {
        
        const SportParams = req.body;
        const sports = new Sport({
            name: SportParams.name,
        })

        await sports.save();

        res.json(sports);
    }
    
    async listbyId(req, res) {
        
        const id = req.params.id;
        const sports = await Sport.findById(id);

        res.json({
            sports: sports
        });
    }

    async listAthletes(req, res) {
        
        const id = req.params.id;
        const sports = await Sport.findById(id);
        let i = 0;
        var athleteslist = [];
        for (var athleteId of sports.athletes){
            const athlete = await Athlete.findById(athleteId);
            var name = athlete.firstName + " " + athlete.lastName;
            athleteslist.push(name);
        }
        res.json({
            // sport: sports,
            athleteslist : athleteslist,
        });
    }

    async AddAthleteToSport(req, res) {
        
        const idSport = req.params.idSport;
        const idAthlete = req.params.idAthlete;
        const athlete = await Athlete.findById(idAthlete);
        const sports = await Sport.findById(idSport);
        sports.athletes.push(athlete.id);
        await sports.save();
        res.json(sports);
    }

}

module.exports = SportController;
