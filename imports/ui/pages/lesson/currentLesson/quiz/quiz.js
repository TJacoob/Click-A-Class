import './quiz.html';

import { Teacher } from '/imports/api/teacher/teacher.js';
import { Lesson } from '/imports/api/lesson/lesson.js';
import { Class } from '/imports/api/class/class.js';
import { Click } from '/imports/api/click/click.js';

// Flic Association
Template.quiz.onCreated(function(){
	//this.waitingClick = new ReactiveVar(true);
	this.lessonNumber = new ReactiveVar(this.data.lesson);
});


Template.quiz.helpers({
	
});

Template.quiz.events({
	'click #finish-quiz': function(){
		let l = Lesson.findOne({"number":Template.instance().lessonNumber.get()});
		Lesson.update({"_id":l._id},{"$set":{"state":"idle"}});
	},
});