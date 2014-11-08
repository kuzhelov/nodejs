function double_async(arg, callback)
{   
    console.log('request for ' + arg + ' has been received');
    
    setTimeout(
        function() { callback(null, arg * 2) }, 
        1000);
}

double_async(
    100, 
    function(err, result) { console.log('Result is: ' + result) });
    
double_async(
    3000000000, 
    function(err, result) { console.log('Result is: ' + result) });
    
double_async(
    100000, 
    function(err, result) { console.log('Result is: ' + result) });