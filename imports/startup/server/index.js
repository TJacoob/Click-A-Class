// Import server startup through a single index entry point

import './register-api.js';
import './flicsConnection.js';
import './populate.js';
//import './api.js';

Meteor.call("startDaemon", function (err, data) {
    if(err){
        console.log("Error: " + err);
    }else{
        console.log("Started Daemons");
    }
});