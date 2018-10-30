import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import needed templates
import '../../ui/layouts/body/body.js';
import '../../ui/pages/home/home.js';
import '../../ui/pages/not-found/not-found.js';
import '../../ui/pages/admin/raspberries/raspberries.js';

// Set up all routes in the app
FlowRouter.route('/', {
	name: 'App.home',
	action() {
		BlazeLayout.render('App_body', { main: 'App_home' });
	},
});

// Tests Routes
FlowRouter.route('/tests/raspberries', {
	name: 'TestsRaspberries',
	action() {
		BlazeLayout.render('test_raspberries');
	},
});

FlowRouter.notFound = {
	action() {
		BlazeLayout.render('App_body', { main: 'App_notFound' });
	},
};
