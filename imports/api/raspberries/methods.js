import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Raspberries } from './raspberries.js';

Meteor.methods({

	newRaspberry: function(serial, ip){

		let rasp = {			
			"serial": serial,
			"ipAddress": ip,
			"connected": false
		};
		
		Raspberries.insert(rasp);

		console.log("Created new Raspberry with the following Address:" + rasp["ipAddress"]);
	},

});
