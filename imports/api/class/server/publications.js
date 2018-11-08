import { Meteor } from 'meteor/meteor';
import { Class } from '../class.js';

Meteor.publish('class.all', function () {
	return Class.find();
});
