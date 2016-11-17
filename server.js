//This code was tested on mac OSX

//get required stuff
var http = require('http');
var fs = require('fs');

var path = require('path');

var staticDir = path.join(__dirname, 'public');
var indexFilename = 'index.html';
var notFoundFilename = '404.html';
var port = process.env.PORT || 3000;

//cache files
var cache = {};
cache['index.html'] =   fs.readFileSync(staticDir + "/" + indexFilename);
cache['index.js'] =     fs.readFileSync(staticDir + "/index.js");
cache['style.css'] =    fs.readFileSync(staticDir + "/style.css");
cache['404.html'] =     fs.readFileSync(staticDir + "/404.html");


function handleRequest(request, response) {
    console.log("== Got request for:", request.url);

    if(request.url == "/" ){
        response.statusCode = 200;
        response.setHeader("Content-Type", "text/html");
        var contents = cache['index.html'];
        response.write(contents);
        response.end();
    } else {
        //check if file is present
        var temp = 0;
        var files = fs.readdirSync(staticDir);
        for (var i in files) {
            if(request.url == "/" + files[i]){
                temp = 1;
            }
        }

        //if file not there, 404
        if(temp == 0){
            response.statusCode = 404;
            response.setHeader("Content-Type", "text/html");
            var contents = cache['404.html'];
            response.write(contents);
            response.end();
        } else {
            //file exists, check if in cache
            var tempFileName = request.url.replace("/","");

            if(tempFileName in cache){
                //In cache, send cache version
                response.statusCode = 200;
                var contents = cache[tempFileName];
                response.write(contents);
                response.end();
            } else {
                //not in cache, add to cache and send from cache
                cache[tempFileName] = fs.readFileSync(staticDir + request.url, 'utf8');
                //send
                response.statusCode = 200;
                var contents = cache[tempFileName];
                response.write(contents);
                response.end();
            }
        }
    }
}

var server = http.createServer(handleRequest);

// Start the server listening on the specified port.
server.listen(port, function () {
    console.log("== Server listening on port:", port);
});
