import './editClassroom.html';

import { Classroom } from '/imports/api/classroom/classroom.js';

Template.editClassroom.onRendered(function(){
	var self = this;
	self.autorun(function(){
		var number = parseInt(FlowRouter.getParam('number'));
		self.subscribe('classroom.single', number);
	});
});

Template.editClassroom.helpers({
	Classroom(){
		return Classroom;
	},
	currentClassroom(){
		return Classroom.findOne({"number":parseInt(FlowRouter.getParam('number'))});
	},
});

Template.editClassroom.events({
	'click #go-back': function(){
		//FlowRouter.go("/classroom/show/"+parseInt(FlowRouter.getParam('number')));
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


AutoForm.addHooks(['editClassroom'],{
	onSuccess: function(formType, result) {
		FlowRouter.go("/classroom/show")
	}
});