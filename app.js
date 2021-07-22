const express = require("express");
const path = require("path");
const app = express();
const fs = require('fs');
const bodyparser = require("body-parser");
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Olearncontact', { useNewUrlParser: true});
const port = 80;

//Define mongoose schema
var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    message: String,
});

var contact = mongoose.model('contacts', contactSchema);

//EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')); //For serving static files.
app.use(express.urlencoded());

//PUG SPECIFIC STUFF
app.set('view engine', 'pug'); //set the templete engine as pug
app.set('views', path.join(__dirname, 'views')); //set the view directory

//ENDPOINTS
app.get('/', (req, res) => {
    const params = {}
    res.status(200).render('home.pug',params);
});

app.get('/contact', (req, res) => {
    const params = {}
    res.status(200).render('contact.pug',params);
});

app.post('/contact', (req, res) => {
    var myData = new contact(res.body);
    myData.save().then(() => {
        res.send("This item has been saved to the database.")
    }).catch(() => {
        res.status(404).send("Item was not saved to the database.")
    })
    // res.status(200).render('contact.pug');
});

//START THE SERVER
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});