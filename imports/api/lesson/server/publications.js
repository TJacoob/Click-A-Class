import { Meteor } from 'meteor/meteor';
import { Lesson } from '../lesson.js';

import { Teacher } from '/imports/api/teacher/teacher.js';

Meteor.publish('lesson.all', function () {
	return Lesson.find();
});

Meteor.publish('lesson.own.current', function () {
	let t = Teacher.findOne({"user":this.userId});
	return Lesson.find({"$and":[{"teacher":t._id},{"state":{"$ne":"finished"}}]});
});
