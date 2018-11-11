import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

AutoForm.debug();

// Import needed templates
import '../../ui/pages/index/index.js';
import '../../ui/pages/admin/raspberries/raspberries.js';
import '../../ui/pages/admin/teachers/teachers.js';
import '../../ui/pages/admin/classes/classes.js';
import '../../ui/pages/login/login.js';
import '../../ui/pages/signup/signup.js';
import '../../ui/pages/dashboard/dashboard.js';
import '../../ui/pages/not_found/not_found.js';
import '../../ui/pages/class/addClass/addClass.js';
import '../../ui/pages/class/editClass/editClass.js';
import '../../ui/pages/class/showClass/showClass.js';
import '../../ui/pages/teacher/editTeacher/editTeacher.js';
import '../../ui/pages/teacher/showTeacher/showTeacher.js';

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

// Class
FlowRouter.route('/class/show/:number',{
	name: 'ShowClass',
	action(){
		BlazeLayout.render('showClass');
	},
});

FlowRouter.route('/class/edit/:number',{
	name: 'EditClass',
	action(){
		BlazeLayout.render('editClass');
	},
});

FlowRouter.route('/class/add/',{
	name: 'AddClass',
	action(){
		BlazeLayout.render('addClass');
	},
});

// Teacher
FlowRouter.route('/teacher/',{
	name: 'ShowTeacher',
	action(){
		BlazeLayout.render('showTeacher');
	},
});

FlowRouter.route('/teacher/edit',{
	name: 'EditTeacher',
	action(){
		BlazeLayout.render('editTeacher');
	},
});

// Tests Routes
FlowRouter.route('/tests/raspberries', {
	name: 'TestsRaspberries',
	action() {
		BlazeLayout.render('test_raspberries');
	},
});

FlowRouter.route('/tests/teachers', {
	name: 'TestsTeachers',
	action() {
		BlazeLayout.render('test_teachers');
	},
});

FlowRouter.route('/tests/classes', {
	name: 'TestsClasses',
	action() {
		BlazeLayout.render('test_classes');
	},
});


FlowRouter.notFound = {
	action() {
		BlazeLayout.render('not_found');
	},
};