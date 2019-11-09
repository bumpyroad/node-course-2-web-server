const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const printFocusedMap = require('./utils/printFocusedMap');
const path = require('path');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log');
        }
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});


app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my page'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });
});

app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        pageTitle: 'Projects',
    });
});

app.get('/bad', (req, res) => {
    res.send('Unable to process requrest');
});

app.get('/what', (req, res) => {
    if(!req.query.address){
        res.send('nope');
    } else {
        printFocusedMap(req.query.address, (error, data) => {
            var options = {
                root: path.join(__dirname, 'img'),
                dotfiles: 'deny',
                headers: {
                  'x-timestamp': Date.now(),
                  'x-sent': true
                }
            };                   
            res.set('Content-Type', 'image/png');
            res.sendFile(data, options, function (err) {
                if (err) {
                  next(err)
                } else {
                  console.log('Sent:', data)
                }
            });
        });
    }
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
