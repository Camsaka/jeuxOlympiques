const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://abbes:rayan@cluster0.cjarb.mongodb.net/jeuxolympique?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error:'));

db.once('open', function() {
    console.log('Connected to the database! ✅');
});