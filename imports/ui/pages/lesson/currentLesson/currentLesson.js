import './currentLesson.html';
import './association/association.js';
import './idle/idle.js';
import './quiz/quiz.js';

import { Teacher } from '/imports/api/teacher/teacher.js';
import { Lesson } from '/imports/api/lesson/lesson.js';
import { Class } from '/imports/api/class/class.js';
import { Click } from '/imports/api/click/click.js';

Template.currentLesson.onRendered(function(){
	var self = this;
	self.autorun(function(){
		self.subscribe("teacher.own");
		self.subscribe("lesson.own.current");
		self.subscribe("classroom.own");
		self.subscribe("class.own");
		self.subscribe("click.all");
	});
});

Template.currentLesson.helpers({
	Lesson(){
		return Lesson;
	},
	currentLesson(){
		let t = Teacher.findOne({"user":Meteor.userId()});
		if ( t != undefined )
			return Lesson.findOne({"$and":[{"teacher":t._id},{"state":{"$ne":"off"}}]});
	},
	classObject(){
		let t = Teacher.findOne({"user":Meteor.userId()});
		if ( t != undefined )
		{
			let l = Lesson.findOne({"$and":[{"teacher":t._id},{"state":{"$ne":"off"}}]});
			if ( l != undefined )
				return Class.findOne({"number":l.class});
		}
	},
	teacherName(){
		return Teacher.findOne({"_id":this.teacher}).name;
	},
	className(){
		return Class.findOne({"number":this.class}).name;
	},
	isOn(){
		return this.state == "on";
	},
	isAssociation(){
		return this.state == "association";
	},
	isIdle(){
		return this.state == "idle";	
	},
	isQuiz(){
		return this.state == "quiz";	
	},
});

Template.currentLesson.events({
	'click #start-association ': function(){
		Lesson.update({"_id":this._id},{"$set":{"state":"association"}});
	},
});

