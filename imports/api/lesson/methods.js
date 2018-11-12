import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Lesson } from './lesson.js';

import { Teacher } from '/imports/api/teacher/teacher.js';

Meteor.methods({

	newLesson: function(doc){
		// Lessons can't be started if teacher is still on another one
		let teacher = Teacher.findOne({"user":this.userId});
		//let prev_lessons = Lesson.find({"teacher":teacher._id}).find({"$ne":{"state":"finished"}});
		//let prev_lesson = Lesson.findOne({"$and":[{"$ne":{"state":"finished"}},{"teacher":this.userId}]});
		let prev_lesson = Lesson.find({"$and":[{"teacher":this.userId},{"state":{"$ne":"finished"}}]});
		//console.log(prev_lesson.count());
		let active_lessons = Lesson.find({"$and":[{"classroom":doc.classroom},{"state":{"$ne":"finished"}}]})
		if ( active_lessons.count() != 0 )
			throw new Meteor.Error('classroom-in-lesson',"This classroom is busy, can't start a new class here.")
		else if ( prev_lesson.count() != 0 )
			throw new Meteor.Error('still-in-lesson',"This teacher didn't finish his previous lesson, can't start a new one.")
		else
		{
			let ls = {
				"number": Lesson.find({}).count(),
				"state": "on",
				"classroom": doc.classroom,
				"teacher": this.userId,
				"class": doc.class,
			};
			Lesson.insert(ls);
			console.log("Started class "+ls.number+" in classroom "+ls.classroom+" with theacher "+ls.teacher+" and class "+ls.class);
		}
			
	},

});
