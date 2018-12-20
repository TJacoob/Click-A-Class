import './addStudent.html';

import { Student } from '/imports/api/student/student.js';
import { Class } from '/imports/api/class/class.js';

Template.addStudent.onRendered(function(){
	var self = this;
	self.autorun(function(){
		var number = parseInt(FlowRouter.getParam('number'));
		self.subscribe('class.own.single', number);
		self.subscribe('student.all.class', number);
	});
});

Template.addStudent.helpers({
	Class(){
		return Class;
	},
	currentClass(){
		return Class.findOne({"number":parseInt(FlowRouter.getParam('number'))});
	},
	Student(){
		return Student;
	},
	studentsInClass(){
		return Student.find();
	},
	studentNumber(){
		return Student.find().count() + 1;	
	},
});

Template.addStudent.events({
	'click #go-back': function(){
		FlowRouter.go("/class/edit/"+parseInt(FlowRouter.getParam('number')));
	},
	'click #finish': function(){
		FlowRouter.go("/class/show/"+parseInt(FlowRouter.getParam('number')));
	},
});

AutoForm.addHooks(['addStudent'],{
	before: {
        method: function(doc) {
            doc.class = parseInt(FlowRouter.getParam('number'));
            return doc;
        }               
    },
});
