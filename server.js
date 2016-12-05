var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var fs = require('fs');
var request = require('request');
var bodyParser = require('body-parser');

var app = express();
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

//parse json
app.use(bodyParser.json());

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

    // Fetches based on JSON object's name, not name property
    var place = placeData[req.params.place];

    if(place){
        //console.log("tested success");
        var placeName = place.name;
        res.status(200).render('place-page', {
            pageTitle: 'Place Page - ' + placeName, //placeName
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

//for '/new' - search page
app.get('/new', function (req, res) {
    res.status(200).render('new-page', {
        title: 'New title',
        placeData: placeData
    });
});

app.post('/create/', function (req, res, next) {
    if(req.body && req.body.url){
        var varName = req.body.name;
        var varType = req.body.type;
        var varPhone = req.body.phone;
        var varAddress = req.body.address;
        var varDescription = req.body.description;


        //download and save image in correct place
        var download = function(uri, filename, callback){
            request.head(uri, function(err, res, body){
                console.log('content-type:', res.headers['content-type']);
                console.log('content-length:', res.headers['content-length']);

                request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
            });
        };

        download(req.body.url, "public/images/" + req.body.name + ".jpg", function(){
            console.log('done');
        });

        //add to json
        /*var temp = JSON.stringify({
            name: varName,
            type: varType,
            phone: varPhone,
            address: varAddress,
            city: "Corvallis",
            zipcode: "97330",
            image: "public/images/" + req.body.name + ".jpg",
            description: varDescription,
            image_courtesy: "Nan"
        });*/
/*
        placeData.varName = varName;

        fs.writeFile("place-data.json", JSON.stringify(placeData, null, 2), function (err) {
            if (err) return console.log(err);
            console.log(JSON.stringify(placeData));
            console.log('writing to ' + "place-data.json");
        });
*/
        //var obj = JSON.parse(fs.readFileSync('place-data.json', 'utf8'));
        //placeData.push(newEntry);

        //send success message
        res.status(200).send();
    } else {
        res.status(400).send("No url");
    }


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
