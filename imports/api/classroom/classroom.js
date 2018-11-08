import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

export const Classroom = new Mongo.Collection( 'classroom' );

ClassroomSchema = new SimpleSchema({
	raspberrySerial:{
		type: String,
		label: "Raspberry Connected",
		//autoform: { omit:true },
	},
	name: {
		type: String,
		label: "Name"
	},
	location: {
		type: String,
		label: "Location",
	},
	/*
	students: {
		type: Array,
	},
	'students.$': { type: String },
	*/
	teachers: {
		type: Array,
	},
	'teachers.$': { type: String },
});

Classroom.attachSchema( ClassroomSchema ); 