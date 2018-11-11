import './editClass.html';

import { Class } from '/imports/api/class/class.js';

Template.editClass.onRendered(function(){
	var self = this;
	self.autorun(function(){
		var number = parseInt(FlowRouter.getParam('number'));
		self.subscribe('class.own.single', number);
	});
});

Template.editClass.helpers({
	Class(){
		return Class;
	},
	currentClass(){
		return Class.findOne({"number":parseInt(FlowRouter.getParam('number'))});
	},
});

Template.editClass.events({
	
});


AutoForm.addHooks(['editClass'],{
	onSuccess: function(formType, result) {
		alert("Class edited successfuly");
	}
});