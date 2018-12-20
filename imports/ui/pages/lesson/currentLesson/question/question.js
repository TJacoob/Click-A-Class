import './question.html'

import { Teacher } from '/imports/api/teacher/teacher.js';
import { Lesson } from '/imports/api/lesson/lesson.js';
import { Class } from '/imports/api/class/class.js';
import { Click } from '/imports/api/click/click.js';
import { Quiz } from '/imports/api/quiz/quiz.js';
import { Question } from '/imports/api/question/question.js';
import { Student } from '/imports/api/student/student.js';

Template.question.onRendered(function(){
	var self = this;
	self.autorun(function(){
		//self.subscribe("question.all");
	});
});

Template.question.onCreated(function(){
	//console.log(this.data.questionNumber);
	this.questionNumber = new ReactiveVar(this.data.questionNumber);
	this.showAnswer = new ReactiveVar(false);
});


Template.question.helpers({
	getQuestion(){
		console.log(Template.instance().questionNumber.get());
		return Question.findOne({"number":Template.instance().questionNumber.get()});
	},
	single(){ return this.answers[0]; },
	double(){ return this.answers[1]; },
	hold(){ return this.answers[2]; },
	associated(){
		let lesson = Lesson.findOne();
		let list = lesson.association;
		let associated = [];
		list.forEach(function(student){
			if ( student.mac != null )
				associated.push(student);
		})
		return associated;
	},
	guess(){
		let lesson = Lesson.findOne();
		let quiz = Quiz.findOne({"number":lesson.quiz});
		let question = Question.findOne({"number":Template.instance().questionNumber.get()});
		let click = Click.findOne({"mac":this.mac});
		let color = "";
		if ( click != undefined)
		{
			// Check if Click type is correct answer
			//console.log( click.type );
			//console.log( question.correct );
			if ( !Template.instance().showAnswer.get() )
				return 'fa-circle-notch fa-spin';	
			else
			{
				if ( click.type == question.correct )
					//console.log("correct Answer");
					color = 'fa-check f-green';
				else
					color = 'fa-times f-red';
			}
			//setTimeout(function() { Click.remove({"_id":click._id}); }, 2000);
			return color;
		}
	},
	showAnswer(){ return Template.instance().showAnswer.get(); },
	isCorrect(click){
		if ( click == this.correct && Template.instance().showAnswer.get() )
			return 'answerCorrect';
	},
	studentName(number){
		let s = Student.findOne({"number":parseInt(number)});
		return s.name;
	},
});

Template.question.events({
	'click #finish-question': function(){
		let l = Lesson.findOne();
		let allClicks = Click.find({}); 	// Hammered - Remove All Clicks
		allClicks.forEach(function(c){
			Click.remove({"_id":c._id});
		})
		Lesson.update({"_id":l._id},{"$set":{"state":"idle"}});
	},
	'click #show-answer':function(){
		Template.instance().showAnswer.set(true);
	},
});
