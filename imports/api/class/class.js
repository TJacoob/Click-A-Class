import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

export const Class = new Mongo.Collection( 'class' );

ClassSchema = new SimpleSchema({
	students: {
		type: Array,
	},
	'students.$': { type: String },
});

Class.attachSchema( ClassSchema ); 