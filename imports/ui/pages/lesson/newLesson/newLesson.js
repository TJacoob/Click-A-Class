import './newLesson.html';

import { Lesson } from '/imports/api/lesson/lesson.js';

Template.newLesson.onRendered(function(){
	var self = this;
	self.autorun(function(){
		self.subscribe("teacher.own");
		self.subscribe("class.own");
		self.subscribe("classroom.own");
	});
});

Template.newLesson.helpers({
	Lesson(){
		return Lesson;
	},
});

Template.newLesson.events({
	'click #go-back': function(){
		FlowRouter.go("Dashboard");
	}
});


AutoForm.addHooks(['addLesson'],{
	onSuccess: function(formType, result) {
		Meteor.call("startDaemon", function (err, data) {
	            if(err){
	                console.log("Error: " + err);
	            }else{
	                console.log("Ligado com Sucesso");
	            }
        	});
		FlowRouter.go("CurrentLesson");
	}
});