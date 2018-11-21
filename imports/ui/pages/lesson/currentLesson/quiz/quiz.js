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
	this.quizNumber = new ReactiveVar(this.data.quiz);
	this.questionNumber = new ReactiveVar(0);
});


Template.quiz.helpers({
	currentQuiz(){
		console.log(Quiz.findOne({"number":Template.instance().quizNumber.get()}));
		return Quiz.findOne({"number":Template.instance().quizNumber.get()});
	},
	getQuestion(){
		let q = this.questions;
		let count = Template.instance().questionNumber.get();
		console.log(q);
		console.log(count);
		return Question.findOne({"number":q[count]});
	},
});

Template.quiz.events({
	'click #finish-quiz': function(){
		let l = Lesson.findOne({"number":Template.instance().lessonNumber.get()});
		Lesson.update({"_id":l._id},{"$set":{"state":"idle"}});
	},
});
