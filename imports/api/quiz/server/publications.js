import { Meteor } from 'meteor/meteor';
import { Quiz } from '../quiz.js';

import { Teacher } from '/imports/api/teacher/teacher.js';

Meteor.publish('quiz.all', function () {
	return Quiz.find();
});

Meteor.publish('quiz.own', function () {
	let teacher = Teacher.findOne({"user":this.userId});
	return Quiz.find({"owner":teacher._id});
});

Meteor.publish('quiz.own.single', function (number) {
	let teacher = Teacher.findOne({"user":this.userId});
	return Quiz.find({"$and":[{"number":number},{"owner":teacher._id}]});
});