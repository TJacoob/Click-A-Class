import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

export const Raspberries = new Mongo.Collection( 'raspberries' );

RaspberriesSchema = new SimpleSchema({
	serial: {
		type: String,
		label: "Serial Number",
	},
	ipAddress: {
		type: String,
		label: "Last Ip Address",
	},
	connected: {
		type: Boolean,
		label: "Connected",
	}
});