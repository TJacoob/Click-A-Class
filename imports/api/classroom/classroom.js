import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

export const Classroom = new Mongo.Collection( 'classroom' );

ClassroomSchema = new SimpleSchema({
	raspberrySerial:{
		type: String,
		label: "Raspberry Connected",
		autoform: { omit:true },
	},
	number: {
		type: Number,
		autoform: { omit:true },
	},
	password:{		// Should be unique so a classroom can be identified by it
		type: String,
		label: "Access Password",
		autoform: { omit:true },
	},
	name: {
		type: String,
		label: "Name",
		optional: true,
	},
	location: {
		type: String,
		label: "Location",
		optional: true,
	},
	school: {
		type: String,
		label: "School",
		optional: true,
	},
	/*
	class: {
		type: String,
		label: "Class",
	},
	*/
	teachers: {
		type: Array,
	},
	'teachers.$': { type: String },
});

Classroom.attachSchema( ClassroomSchema ); 