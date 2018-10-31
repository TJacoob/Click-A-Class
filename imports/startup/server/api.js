/*

Meteor.bindEnvironment(function (err, data) {

    console.log(data);
    console.log(err);

    

  
})

*/

var Future = Npm.require( 'fibers/future' ); 
var data = '';

var future = new Future();

function callbackTest(){
    if (err) {
        // handle error
        return; // Returning here is important!
    }
    console.log("Hello");
}

// Listen to incoming HTTP requests (can only be used on the server).
WebApp.connectHandlers.use('/test/connect', function(req, res, callbackTest) {

    let body = '';
    req.on('data', chunk => {
        body += chunk.toString(); // convert Buffer to string
    });
    req.on('end', () => {
        console.log(body);
        data = JSON.parse(body);
        console.log("Serial: "+data["serial"]);
        console.log("IP: "+data["ip"]);   
        /*
        Meteor.call("newRaspberry", data["serial"], data["ip"], function (err, data) {
            if(err){
                //alert("Error: " + err);
                future.return( error );
            }else{
                future.return( response );
                //console.log("Success, created!");
                //console.log("THIS:" + data["serial"]);
            }
        });
        future.wait();
        */
    });

    //callbackTest();

    res.writeHead(200);
    res.end(`Hello world from: ${Meteor.release}`);



});



