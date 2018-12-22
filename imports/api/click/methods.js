import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Click } from './click.js';

Meteor.methods({

	fakeSingleClick: function(mac){
		var c = {
			'raspberry':"12345",
			'mac':mac,
			'type': 'ButtonSingleClick',
			'time': Date.now()
		};
		Click.insert(c);
	},

	fakeDoubleClick: function(mac){
		var c = {
			'raspberry':"12345",
			'mac':mac,
			'type': 'ButtonDoubleClick',
			'time': Date.now()
		};
		Click.insert(c);
	},

	fakeHold: function(mac){
		var c = {
			'raspberry':"12345",
			'mac':mac,
			'type': 'ButtonHold',
			'time': Date.now()
		};
		Click.insert(c);
	},

});
