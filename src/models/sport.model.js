'use strict';

const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

const sportSchema = new mongoose.Schema({
    name: String,
    category: String,

    // ... A COMPLETER ...
    // Exemple :
    // athletes : [{ type: Schema.Types.ObjectId, ref: 'Athlete' }]
});

const Sport = mongoose.model('Sport', sportSchema);

module.exports = Sport;