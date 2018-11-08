import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

export const Student = new Mongo.Collection( 'student' );

StudentSchema = new SimpleSchema({
	name: {
		type: String,
		label: "Name"
	},
});

Student.attachSchema( StudentSchema ); 