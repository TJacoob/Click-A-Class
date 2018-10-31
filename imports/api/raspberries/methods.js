import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Raspberries } from './raspberries.js';


Meteor.methods({

	newRaspberry: function(serial, ip){		

		console.log("S: "+serial);
		console.log("IP: "+ip);

		let rasp = {			
			"serial": serial,
			"ipAddress": ip,
			"connected": false
		};
		
		Raspberries.insert(rasp);

		console.log("Created new Raspberry with the following Address:" + rasp["ipAddress"]);
	},

	connect: function(jsonData){
		console.log("Received new connection:");
		console.log(jsonData.serial);
		console.log(jsonData.ip);

		// Check If Serial Already Exists
		let r = Raspberries.findOne({"serial":jsonData.serial});
		if ( r == undefined )	// If doesn't exist, create new one
		{
			let rasp = {			
				"serial": jsonData.serial,
				"ipAddress": jsonData.ip,
				"connected": false
			};
			
			Raspberries.insert(rasp);
			console.log("Created new Raspberry with the following Serial Number:" + rasp["serial"]);
		}
		else
		{
			console.log("The Raspberry "+jsonData.serial+" reconnected!")	
		}
	},

});
