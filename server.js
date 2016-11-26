var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');

var app = express();
//var usersData = require('./users-data');
var placeData = require('./place-data');
var port = process.env.PORT || 3000;

// Use Handlebars as the view engine for the app.
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars');

/*
*
*   Serve requests
*
*/

//static files from /public
app.use(express.static(path.join(__dirname, 'public')));

//for '/' path send view/index-page.handlebars
app.get('/', function (req, res) {
    res.status(200).render('index-page', {
        title: 'Homepage title',
        placeData: placeData
    });
});


//for '/place/NAME'
app.get('/place/:place', function (req, res, next) {
    var place = placeData[req.params.place];

    if(place){
        var placeName = place.name;
        res.status(200).render('place-page', {
            title: 'Place page - ' + placeName,
            place: place,
            placeName: placeName
        });
    } else {
        next();
    }
});

//for '/search' - search page
app.get('/search', function (req, res) {
    res.status(200).render('search-page', {
        title: 'Search title',
        placeData: placeData
    });
});

//404
app.get('*', function (req, res) {
    res.status(404).render('404-page', {
        title: '404'
    });
});

// Listen on the specified port.
app.listen(port, function () {
    console.log("== Listening on port", port);
});
