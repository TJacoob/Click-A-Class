import './showClass.html';

import { Class } from '/imports/api/class/class.js';

Template.showClass.onRendered(function(){
	var self = this;
	self.autorun(function(){
		var number = parseInt(FlowRouter.getParam('number'));
		self.subscribe('class.own.single', number);
	});
});

Template.showClass.helpers({
	Class(){
		return Class;
	},
	currentClass(){
		return Class.findOne({"number":parseInt(FlowRouter.getParam('number'))});
	},
});

Template.showClass.events({
	
});