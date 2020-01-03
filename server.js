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
hbs.registerHelper('json', (obj) => {
    return new hbs.SafeString(JSON.stringify(obj));
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Home'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });
});

app.get('/barcode', (req, res) => {
    res.render('barcode.hbs', {
        bcContent : req.query.d,
    });
});

app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        pageTitle: 'Projects',
    });
});

app.get('/bad', (req, res) => {
    res.send('Unable to process request');
});

app.get('/focusmap', (req, res) => {
    
    // focusmap will parse the JSON received
    // and use it to make a map.
    res.render('focusmap.hbs', {        
        treeMarkers : req.query.d,
    });
});

app.get('/map', (req, res) => {

    //Pass it /?mapdata=( A JSON object of things to map)
    // It will send that object to the map page as /?d=( A JSON object of things to map)

    // This is the site where the map resides
    //let relLocation = req.protocol + '://' + req.hostname + ':' + port;
    
    // No port for the production version redirect
    let relLocation = req.protocol + '://' + req.hostname;

    // Callback will take the screenshot of that map and send it as an image
    printFocusedMap(req.query.mapdata, relLocation, (error, data) => {
        
        //res.send('OK, I should be finished shortly');
        
        //if(error != undefined){
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
                    res.send(err);
                } else {
                    console.log('Sent:', data)
                }
            });
        //} else {
        //    res.send('Unable to process request');
        //}
        
           
    });    
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
