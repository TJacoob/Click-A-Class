import './addClassroom.html';

import { Classroom } from '/imports/api/classroom/classroom.js';

Template.addClassroom.onRendered(function(){
	var self = this;
	self.autorun(function(){
		
	});
});

Template.addClassroom.helpers({
	Classroom(){
		return Classroom;
	},
	
});

Template.addClassroom.events({
	'click #go-back-2': function(){
		FlowRouter.go("/classroom/show/");
    },
    
    'click #associateClassroom': function(){
		var password = prompt("Insert the password displayed on your raspberry");
		Meteor.call("associateTeacher", password, function (err, data) {
            if(err){
                console.log("Error: " + err);
            }else{
                alert("Associated Successfully with a room");
            }
    	});
	},
});


AutoForm.addHooks(['addClassroom'],{
	onSuccess: function(formType, result) {
		alert("Classroom added successfuly");
	}
});