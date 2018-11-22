import './allClass.html'

import { Class } from '/imports/api/class/class.js';

Template.allClass.onRendered(function(){
	var self = this;
	self.autorun(function(){
		self.subscribe('class.own');
	});
});

Template.allClass.helpers({
	Class(){
		return Class;
	},
	allClass(){
		return Class.find();
	},
});

Template.allClass.events({
	
});