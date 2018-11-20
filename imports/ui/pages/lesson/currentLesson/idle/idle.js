import './idle.html';

import { Teacher } from '/imports/api/teacher/teacher.js';
import { Lesson } from '/imports/api/lesson/lesson.js';
import { Class } from '/imports/api/class/class.js';
import { Click } from '/imports/api/click/click.js';

// Flic Association
Template.idle.onCreated(function(){
	//this.waitingClick = new ReactiveVar(true);
	this.lessonNumber = new ReactiveVar(this.data.lesson);
});


Template.idle.helpers({
	associated(){
		let list = Lesson.findOne({"number":this.lesson}).association;
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
			return "f-red";
		}
	},
});

Template.idle.events({
	'click #start-quiz': function(){
		let l = Lesson.findOne({"number":Template.instance().lessonNumber.get()});
		Lesson.update({"_id":l._id},{"$set":{"state":"quiz"}});
	},
});