import { Meteor } from 'meteor/meteor';
import { Classroom } from '../classroom.js';

Meteor.publish('classroom.all', function () {
	return Classroom.find();
});

Meteor.publish('classroom.single', function (number) {
	return Classroom.find({"number":number});
});