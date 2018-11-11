import './classes.html'

import { Class } from '/imports/api/class/class.js';

Template.test_classes.onRendered(function(){
	var self = this;
	self.autorun(function(){
		self.subscribe("class.all");
	});
});

Template.test_classes.helpers({
	Class(){
		return Class.find({});
	},
});

Template.test_classes.events({
	
});