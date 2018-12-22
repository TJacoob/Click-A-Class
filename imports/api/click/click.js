import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

import { Teacher } from '/imports/api/teacher/teacher.js';
import { Classroom } from '/imports/api/classroom/classroom.js';
import { Class } from '/imports/api/class/class.js';

export const Click = new Mongo.Collection( 'click' );

Click.allow({
  insert() { return false; },
  update() { return false; },
  remove() { return true; },
});

// This object is a simple click, intended to create a log of flic clicks
ClickSchema = new SimpleSchema({
	raspberry: {
		type: String,
		label: "Raspberry",
	},
	mac: {
		type: String,
		label: "Number",
	},
	type: {
		type: String,
		allowedValues: ["ButtonSingleClick","ButtonDoubleClick","ButtonHold"],
		label: "Type",
	},
	time: {
		type: Date,
		label: "Time",
	},
});

Click.attachSchema( ClickSchema ); 