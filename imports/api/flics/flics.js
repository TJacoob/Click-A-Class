import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

export const Flics = new Mongo.Collection( 'flics' );

/*
Flics.allow({
	insert() { return false; },
	update() { return false; },
	remove() { return false; }
});

Flics.deny({
	insert() { return true; },
	update() { return true; },
	remove() { return true; }
});
*/

FlicsSchema = new SimpleSchema({
	id: {
		type: String,
		label: "ID",
	}
});