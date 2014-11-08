var fileName = 'file.txt';

var routes = {};
routes['/']             = function(response) { sendHomePageContent(response); };
routes['/' + fileName]  = function(response) { sendFileContent(response, fileName); };
  
var server = require("http").createServer(
    function(req, res) {
        processRequest(req, res);
    });
    
server.listen(process.env.PORT, process.env.IP);

/////

function processRequest(httpRequest, httpResponse)
{
    if (routes[httpRequest.url])
    {
        var processingAction = routes[httpRequest.url];
        processingAction(httpResponse);
    }
    else 
    {
        sendDefaultPageContent(httpResponse);
    }
}

function sendHomePageContent(httpResponse) {
    httpResponse.writeHead(
        200, {
            'Content-Type': 'text/plain'
        });
    httpResponse.end('You are at home page');
}

function sendFileContent(httpResponse, fileName) {
    require("fs")
        .createReadStream(__dirname + '/' + fileName)
        .on(
            'error', 
            function(err) { 
                httpResponse.end(err.toString());
            })
        .pipe(httpResponse);
}

function sendDefaultPageContent(httpResponse)
{
    httpResponse.end('You are on unknown page');
}
