import './addClass.html';

import { Class } from '/imports/api/class/class.js';

Template.addClass.onRendered(function(){
	var self = this;
	self.autorun(function(){
		
	});
});

Template.addClass.helpers({
	Class(){
		return Class;
	},
});

Template.addClass.events({
	
});


AutoForm.addHooks(['addClass'],{
	onSuccess: function(formType, result) {
		alert("Class added successfuly");
	}
});