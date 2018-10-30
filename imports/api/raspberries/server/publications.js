// All raspberries-related publications

import { Meteor } from 'meteor/meteor';
import { Raspberries } from '../raspberries.js';

Meteor.publish('raspberries.all', function () {
	return Raspberries.find();
});
