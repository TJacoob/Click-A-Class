import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Ping from 'ping.js';
import { Raspberries } from './raspberries.js';


Meteor.methods({

	newRaspberry: function(serial, ip){		

		//console.log("S: "+serial);
		//console.log("IP: "+ip);

		let rasp = {
			"number": Raspberries.find({}).count()+1,
			"serial": serial,
			"ipAddress": ip,
			"connected": true,
			"favorite": false
		};
		
		Raspberries.insert(rasp);

		console.log("Created new Raspberry with the following Address:" + rasp["ipAddress"]);
	},

	connect: function(jsonData){
		console.log("Received new connection:");
		console.log("S: " + jsonData.serial);
		console.log("IP: "+ jsonData.ip);

		// Check If Serial Already Exists
		let r = Raspberries.findOne({"serial":jsonData.serial});
		if ( r == undefined )	// If doesn't exist, create new raspberry and classroom
		{	
			Meteor.call("newRaspberry", jsonData.serial, jsonData.ip, function (err, data) {
	            if(err){
	                console.log("Error: " + err);
	            }else{
	                //console.log("Success, created!");
	            }
        	});
        	Meteor.call("newClassroom", jsonData.serial, function (err, data) {
	            if(err){
	                console.log("Error: " + err);
	            }else{
	                //console.log("Success, created!");
	            }
        	});
		}
		else
		{
			Raspberries.update(r._id,{$set:{"connected":true}});
			Raspberries.update(r._id,{$set:{"ipAddress":jsonData.ip}});			
			console.log("The Raspberry "+jsonData.serial+" reconnected!")	
		}
	},

	checkAliveAll: function(){
		console.log("Starting Check Alive Call");
		let r = Raspberries.find({'connected':true});
		r.forEach(function(rasp){
        	HTTP.call( 'get', 'http://'+rasp.ipAddress+':8090', function( error, response ) {
				if ( error ) {
					console.log( error );
					Raspberries.update(rasp._id,{$set:{"connected":false}});
				} else {
					//console.log( response.content );
					if ( response.content == 'online' )
						console.log("Raspberry "+ rasp.serial +" is connected");
					else
						Raspberries.update(rasp._id,{$set:{"connected":false}});
				};
			});
		});
		console.log("Finished Check Alive Call");
	},
	
});
