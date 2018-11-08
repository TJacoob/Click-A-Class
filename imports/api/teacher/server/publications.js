import { Meteor } from 'meteor/meteor';
import { Teacher } from '../teacher.js';

Meteor.publish('teacher.all', function () {
	return Teacher.find();
});
