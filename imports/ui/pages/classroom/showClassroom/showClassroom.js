import './showClassroom.html';

import { Classroom } from '/imports/api/classroom/classroom.js';

Template.showClassroom.onRendered(function(){
	var self = this;
	self.autorun(function(){
		var number = parseInt(FlowRouter.getParam('number'));
		self.subscribe('classroom.single', number);
	});
});

Template.showClassroom.helpers({
	Classroom(){
		return Classroom;
	},
	currentClassroom(){
		return Classroom.findOne({"number":parseInt(FlowRouter.getParam('number'))});
	},
});

Template.showClassroom.events({
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
