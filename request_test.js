var request = require("request");

request(
    'http://www.google.com', 
    function(error, responce, content) {
        if (error) { console.error(error.message); }
        else if (responce.statusCode === 200)
        {
            console.log(content);
        }
    });
    
// streaming
request('http://google.com').pipe(process.stdout);