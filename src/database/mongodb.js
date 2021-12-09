const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://camilleg:1234@cluster0.gtp12.mongodb.net/jeuxOlympiques?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error:'));

db.once('open', function() {
    console.log('Connected to the database! ✅');
});