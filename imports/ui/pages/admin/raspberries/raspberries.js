import './raspberries.html';

import { Raspberries } from '/imports/api/raspberries/raspberries.js';

Template.test_raspberries.onRendered(function(){
	var self = this;
	self.autorun(function(){
		self.subscribe("raspberries.all");
	});
});

Template.test_raspberries.helpers({
	raspberry(){
		return Raspberries.find({});
	},
});

Template.test_raspberries.events({
	
});