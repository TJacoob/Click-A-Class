import './currentLesson.html';
import './association/association.js';
import './quiz/quiz.js';
import './question/question.js';

import { Teacher } from '/imports/api/teacher/teacher.js';
import { Lesson } from '/imports/api/lesson/lesson.js';
import { Class } from '/imports/api/class/class.js';
import { Classroom } from '/imports/api/classroom/classroom.js';
import { Click } from '/imports/api/click/click.js';
import { Quiz } from '/imports/api/quiz/quiz.js';
import { Question } from '/imports/api/question/question.js';
import { Student } from '/imports/api/student/student.js';

Template.currentLesson.onRendered(function(){
	var self = this;
	self.autorun(function(){
		self.subscribe("teacher.own");
		self.subscribe("lesson.own.current");
		self.subscribe("classroom.own");
		self.subscribe("class.own");
		self.subscribe("click.all");
		self.subscribe("quiz.own");
		self.subscribe("question.all");
		self.subscribe("student.all.class.current");
	});
});

Template.currentLesson.onCreated(function(){
	this.quickNumber = new ReactiveVar(0);
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
	classroomName(){
		return Classroom.findOne({"number":this.classroom}).name;
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
	isQuestion(){
		return this.state == "quick-question";	
	},
	// Idle State Helpers
	associated(){
		let list = this.association;
		let associated = [];
		list.forEach(function(student){
			if ( student.mac != null )
				associated.push(student);
		})
		return associated;
	},
	isClicked(){
		let click = Click.findOne({"mac":this.mac});
		if ( click != undefined)
		{
			setTimeout(function() { Click.remove({"_id":click._id}); }, 2000);
			return "studentClicked";
		}
	},
	quizes(){
		return Quiz.find({});
	},
	today(){
		return new Date().toJSON().slice(0,10).replace(/-/g,'/');
	},
	favoriteQuestion(){
		let t = Teacher.findOne({"user":Meteor.userId()});
		return Question.find({"favoriteUsers":t._id},{sort:{"votes":-1}});
	},
	isFavorite(){
		let t = Teacher.findOne({"user": Meteor.userId()});
		if ( this.favoriteUsers.indexOf(t._id) > -1 )
			return 'fas';
		else
			return 'far';
	},
	subjectIcon(sub)
	{
		if ( sub == 'history') return "fas fa-landmark";
		if ( sub == 'science') return "fas fa-flask";
		if ( sub == 'maths') return "fas fa-calculator";
		if ( sub == 'literature') return "fas fa-book";
	},
	quickNumber(){
		return Template.instance().quickNumber.get();
	},
	studentName(number){
		let s = Student.findOne({"number":parseInt(number)});
		return s.name;
	},
});

Template.currentLesson.events({
	'click #start-association ': function(){
		let clicks = Click.find({});
		clicks.forEach(function(c)
		{
			Click.remove({"_id":c._id});
		});
		Lesson.update({"_id":this._id},{"$set":{"state":"association"}});
	},
	'click .quiz-option': function(){
		let l = Lesson.findOne({});
		Lesson.update({"_id":l._id},{"$set":{"quizCount":0}});
		Lesson.update({"_id":l._id},{"$set":{"quiz":this.number}});
		Lesson.update({"_id":l._id},{"$set":{"state":"quiz"}});
	},
	'click #finish-lesson': function(){
		Lesson.update({"_id":this._id},{"$set":{"state":"finished"}});
		FlowRouter.go("Dashboard");
	},
	'click #favorite-question': function()
	{
		Meteor.call("toggleFavorite", this.number , function (err, data) {
	        if(err){
	            //console.log("Error: " + err);
	        }else{
	            //console.log("Success, created!");
	        }
		});
	},
	'click .quick-question': function(){
		//console.log(this);
		let l = Lesson.findOne({});
		Lesson.update({"_id":l._id},{"$set":{"state":"quick-question"}});
		Template.instance().quickNumber.set(this.number);
	},
});

