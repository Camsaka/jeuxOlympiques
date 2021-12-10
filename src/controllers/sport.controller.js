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
        for ( i = 0; i <= sports.athletes.length; i++ )
        {
                const athletes = await Athlete.findById(sports.athletes[i]);
                athleteslist.push(athletes);
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

    // async AthletesToSport(req, res) {
        
    //     const id = req.params.id;
    //     const name = req.params.name;
    //     const sports = await Sport.findById(id);
    //     const athletes = await Sport.findById(name);
        
    //     const paramSport = req.body;
    //     const paramAthlete = req.body;
    //     const sports = new Sport({
    //         sports: paramAthlete,
    //         athletes: [paramSport],
    //     });
    //     await sports.save();
    //     res.redirect('/api/sports');
    // }
    // ... A COMPLETER ...
}

module.exports = SportController;
