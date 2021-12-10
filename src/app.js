const express = require('express');
const path = require('path');

const app = express();

app.use(express.json());

// Ajouter les routes via les routers
const athleteRouter = require('./routers/athlete.router');
const sportRouter = require('./routers/sport.router');
app.use('/api', athleteRouter);
app.use('/api', sportRouter);
// ... A COMPLETER ...

// Connexion à la base de données
require('./database/mongodb');

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Serveur lancé sur le port ${port} 🚀`);
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

app.use(express.static(path.join(__dirname,"public")));
