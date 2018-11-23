// All raspberries-related publications

import { Meteor } from 'meteor/meteor';
import { Raspberries } from '../raspberries.js';
import { Classroom } from '/imports/api/classroom/classroom.js';
import { Teacher } from '/imports/api/teacher/teacher.js';

Meteor.publish('raspberries.all', function () {
	return Raspberries.find();
});

Meteor.publish('raspberries.classroom.own', function () {
	let t = Teacher.findOne({"user":this.userId});
	if ( t != undefined )
	{
		let cr = Classroom.findOne({"teachers":t._id});
		if ( cr != undefined )
			return Raspberries.find({"serial":cr.raspberrySerial});
	};
});
