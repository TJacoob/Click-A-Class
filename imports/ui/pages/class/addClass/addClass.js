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
	'click #go-back': function(){
		FlowRouter.go("/class/show/");
	},
	/*
	'click #add-class': function(){
		$('#addClassStudents').val("")
		//$(this).prev('input').val("hello world");
		//$('#addClass').submit();
	},
	*/
});


AutoForm.addHooks(['addClass'],{
	onSuccess: function(formType, result) {
		FlowRouter.go("/class/show/");
	}
});