import { Meteor } from 'meteor/meteor';
import { Classroom } from '../classroom.js';

import { Teacher } from '/imports/api/teacher/teacher.js';

Meteor.publish('classroom.all', function () {
	return Classroom.find();
});

Meteor.publish('classroom.own', function(){
	let t = Teacher.findOne({"user":this.userId});
	if ( t != undefined )
		return Classroom.find({"teachers":t._id});
})

Meteor.publish('classroom.single', function (number) {
	return Classroom.find({"number":number});
});