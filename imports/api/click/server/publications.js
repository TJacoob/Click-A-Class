import { Meteor } from 'meteor/meteor';
import { Click } from '../click.js';

import { Teacher } from '/imports/api/teacher/teacher.js';

Meteor.publish('click.all', function () {
	return Click.find();
});

Meteor.publish('click.current', function () {
	return Click.find();
});
