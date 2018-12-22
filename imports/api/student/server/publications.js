import { Meteor } from 'meteor/meteor';
import { Student } from '../student.js';
import { Lesson } from '/imports/api/lesson/lesson.js';

Meteor.publish('student.all', function () {
	return Student.find();
});

Meteor.publish('student.all.class', function (classNumber) {
	return Student.find({"class":classNumber});
});

Meteor.publish('student.all.class.current', function () {
	let l = Lesson.findOne({"state":{"$ne":"finished"}});
	return Student.find({"class":l.class});
});