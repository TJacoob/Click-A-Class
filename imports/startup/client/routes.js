import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import needed templates
import '../../ui/pages/index/index.js';
import '../../ui/pages/admin/raspberries/raspberries.js';
import '../../ui/pages/login/login.js';
import '../../ui/pages/signup/signup.js';
import '../../ui/pages/dashboard/dashboard.js';
import '../../ui/pages/not_found/not_found.js';

// Set up all routes in the app
FlowRouter.route('/', {
	name: 'Index',
	action() {
		BlazeLayout.render('index');
	},
});

// Accounts Routes
FlowRouter.route('/login', {
	name: 'Login',
	action() {
		BlazeLayout.render('login');
	},
});

FlowRouter.route('/signup', {
	name: 'Signup',
	action() {
		BlazeLayout.render('signup');
	},
});

FlowRouter.route('/logout',{
	name: 'Logout',
	action(){
		AccountsTemplates.logout();
		FlowRouter.redirect('/login');
	},
});

// Dashboard
FlowRouter.route('/dashboard',{
	name: 'Dashboard',
	action(){
		BlazeLayout.render('dashboard');
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
		BlazeLayout.render('not_found');
	},
};