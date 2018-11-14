import { Meteor } from 'meteor/meteor';
import { Lesson } from '../lesson.js';

import { Teacher } from '/imports/api/teacher/teacher.js';

Meteor.publish('lesson.all', function () {
	return Lesson.find();
});

Meteor.publish('lesson.own.current', function () {
	return Lesson.find({"$and":[{"teacher":this.userId},{"state":"on"}]});
});
