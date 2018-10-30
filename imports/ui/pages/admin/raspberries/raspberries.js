import './raspberries.html';

import { Raspberries } from '/imports/api/raspberries/raspberries.js';

Template.test_raspberries.onRendered(function(){
	var self = this;
	self.autorun(function(){
		self.subscribe("raspberries.all");
	});
});

Template.test_raspberries.helpers({
	
});

Template.test_raspberries.events({
	
});