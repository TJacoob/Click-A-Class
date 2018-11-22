import './allClassroom.html'

import { Classroom } from '/imports/api/classroom/classroom.js';

Template.allClassroom.onRendered(function(){
	var self = this;
	self.autorun(function(){
		self.subscribe('classroom.own');
	});
});

Template.allClassroom.helpers({
	Classroom(){
		return Classroom;
	},
	allClassroom(){
		return Classroom.find();
	},
});

Template.allClassroom.events({
	'click #see-classroom': function(){
		FlowRouter.go("/classroom/show/"+this.number);
	},

	'click #add-classroom': function(){
		FlowRouter.go("/classroom/add");
	}
});