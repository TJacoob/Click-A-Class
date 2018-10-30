// Listen to incoming HTTP requests (can only be used on the server).
WebApp.connectHandlers.use('/test/connect', (req, res, next) => {

	let body = '';
    req.on('data', chunk => {
        body += chunk.toString(); // convert Buffer to string
    });
    req.on('end', () => {
        console.log(body);
        var data = JSON.parse(body);
    	console.log("Serial: "+data["serial"]);
    	console.log("IP: "+data["ip"]);
    });

	res.writeHead(200);
	res.end(`Hello world from: ${Meteor.release}`);

});