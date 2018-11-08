import { Meteor } from 'meteor/meteor';
import { Student } from '../student.js';

Meteor.publish('student.all', function () {
	return Student.find();
});
