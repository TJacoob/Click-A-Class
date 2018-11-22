import './quiz.html';

import { Teacher } from '/imports/api/teacher/teacher.js';
import { Lesson } from '/imports/api/lesson/lesson.js';
import { Class } from '/imports/api/class/class.js';
import { Click } from '/imports/api/click/click.js';
import { Quiz } from '/imports/api/quiz/quiz.js';
import { Question } from '/imports/api/question/question.js';

Template.quiz.onRendered(function(){
	var self = this;
	self.autorun(function(){
		self.subscribe("question.all");
	});
});

Template.quiz.onCreated(function(){
	//this.waitingClick = new ReactiveVar(true);
	this.lessonNumber = new ReactiveVar(this.data.lesson);
});


Template.quiz.helpers({
	currentQuiz(){
		let lesson = Lesson.findOne({"number":Template.instance().lessonNumber.get()});
		return Quiz.findOne({"number":lesson.quiz});
	},
	hasMoreQuestions(){
		let q = this.questions;
		let count = Lesson.findOne({"number":Template.instance().lessonNumber.get()}).quizCount;
		return ( count < q.length );
	},
	getQuestion(){
		let q = this.questions;
		let count = Lesson.findOne({"number":Template.instance().lessonNumber.get()}).quizCount;
		return Question.findOne({"number":q[count]});
	},
	quizTitle(){
		let lesson = Lesson.findOne({"number":Template.instance().lessonNumber.get()});
		return Quiz.findOne({"number":lesson.quiz}).title;	
	},
	single(){ return this.answers[0]; },
	double(){ return this.answers[1]; },
	hold(){ return this.answers[2]; },
	associated(){
		let lesson = Lesson.findOne({"number":Template.instance().lessonNumber.get()});
		let list = lesson.association;
		let associated = [];
		list.forEach(function(student){
			if ( student.mac != null )
				associated.push(student);
		})
		return associated;
	},
	guess(){
		let lesson = Lesson.findOne({"number":Template.instance().lessonNumber.get()});
		let quiz = Quiz.findOne({"number":lesson.quiz});
		let question = Question.findOne({"number":quiz.questions[lesson.quizCount]});
		let click = Click.findOne({"mac":this.mac});
		let color = "";
		if ( click != undefined)
		{
			// Check if Click type is correct answer
			//console.log( click.type );
			//console.log( question.correct );
			if ( click.type == question.correct )
				//console.log("correct Answer");
				color = 'f-green';
			else
				color = 'f-red';
			//setTimeout(function() { Click.remove({"_id":click._id}); }, 2000);
			return color;
		}
	},
	scoreboard()
	{
		let association = Lesson.findOne({"number":Template.instance().lessonNumber.get()}).association;
		association.sort((a,b) => (a.score > b.score) ? -1 : ((b.score > a.score) ? 1 : 0));
		return association;
	},
	incremented(number){return number+1;},
});

Template.quiz.events({
	'click #finish-quiz': function(){
		let l = Lesson.findOne({"number":Template.instance().lessonNumber.get()});
		Lesson.update({"_id":l._id},{"$set":{"state":"idle"}});
	},
	'click #next-question': function(){
		let lesson = Lesson.findOne({"number":Template.instance().lessonNumber.get()});
		let quiz = Quiz.findOne({"number":lesson.quiz});
		let question = Question.findOne({"number":quiz.questions[lesson.quizCount]});
		// Assign Score
		let association = lesson.association;
		association.forEach(function(a,index){
			let click = Click.findOne({"mac":a.mac});
			let allClicks = Click.find({"mac":a.mac});
			if ( click != undefined)
			{
				if ( click['type'] == question.correct )
					a.score += 1;
				association[index] = a;
				// Clear Clicks
				allClicks.forEach(function(c){
					Click.remove({"_id":c._id});
				})
			}
		})
		Lesson.update({"_id":lesson._id},{"$set":{"association":association}});
		// Move to next Question
		Lesson.update({"_id":lesson._id},{"$set":{"quizCount":lesson.quizCount+1}});
	},
});
