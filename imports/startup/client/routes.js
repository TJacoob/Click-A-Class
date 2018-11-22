import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

AutoForm.debug();

// Import needed templates
import '../../ui/pages/index/index.js';
import '../../ui/pages/admin/raspberries/raspberries.js';
import '../../ui/pages/admin/teachers/teachers.js';
import '../../ui/pages/admin/classes/classes.js';
import '../../ui/pages/admin/classrooms/classrooms.js';
import '../../ui/pages/admin/lessons/lessons.js';
import '../../ui/pages/admin/clicks/clicks.js';
import '../../ui/pages/login/login.js';
import '../../ui/pages/signup/signup.js';
import '../../ui/pages/dashboard/dashboard.js';
import '../../ui/pages/not_found/not_found.js';
import '../../ui/pages/class/addClass/addClass.js';
import '../../ui/pages/class/allClass/allClass.js';
import '../../ui/pages/class/editClass/editClass.js';
import '../../ui/pages/class/showClass/showClass.js';
import '../../ui/pages/teacher/editTeacher/editTeacher.js';
import '../../ui/pages/teacher/showTeacher/showTeacher.js';
import '../../ui/pages/classroom/editClassroom/editClassroom.js';
import '../../ui/pages/classroom/showClassroom/showClassroom.js';
import '../../ui/pages/lesson/newLesson/newLesson.js';
import '../../ui/pages/lesson/showLesson/showLesson.js';
import '../../ui/pages/lesson/currentLesson/currentLesson.js';
import '../../ui/pages/navbar/navbar.js';
import '../../ui/pages/question/addQuestion/addQuestion.js';
import '../../ui/pages/question/editQuestion/editQuestion.js';
import '../../ui/pages/quiz/addQuiz/addQuiz.js';
import '../../ui/pages/quiz/editQuiz/editQuiz.js';
import '../../ui/pages/quiz/editQuiz/editQuizQuestions.js';


// Set up all routes in the app
FlowRouter.route('/', {
	name: 'Index',
	action() {
		//BlazeLayout.render('index');
		BlazeLayout.render('home');
	},
});

// Accounts Routes
FlowRouter.route('/login', {
	name: 'Login',
	action() {
		BlazeLayout.render("login");
	},
});

FlowRouter.route('/signup', {
	name: 'Signup',
	action() {
		BlazeLayout.render("signup");
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
		BlazeLayout.render('index', {content:"dashboard"});
	},
});

// Class
FlowRouter.route('/class/show/',{
	name: 'ShowClass',
	action(){
		BlazeLayout.render('index', {content:"allClass"});
	},
});

FlowRouter.route('/class/show/:number',{
	name: 'ShowClass',
	action(){
		BlazeLayout.render('index', {content:"showClass"});
	},
});

FlowRouter.route('/class/edit/:number',{
	name: 'EditClass',
	action(){
		BlazeLayout.render('index', {content:"editClass"});
	},
});

FlowRouter.route('/class/add/',{
	name: 'AddClass',
	action(){
		BlazeLayout.render('index', {content:"addClass"});
	},
});

// Teacher
FlowRouter.route('/teacher/',{
	name: 'ShowTeacher',
	action(){
		BlazeLayout.render('index', {content:"showTeacher"});
	},
});

FlowRouter.route('/teacher/edit',{
	name: 'EditTeacher',
	action(){
		BlazeLayout.render('index', {content:"editTeacher"});
	},
});

// Classroom
FlowRouter.route('/classroom/show/:number',{
	name: 'ShowClassroom',
	action(){
		BlazeLayout.render('index', {content:"showClassroom"});
	},
});

FlowRouter.route('/classroom/edit/:number',{
	name: 'EditClass',
	action(){
		BlazeLayout.render('index', {content:"editClassroom"});
	},
});

// Lessons
FlowRouter.route('/lesson/current',{
	name: 'CurrentLesson',
	action(){
		BlazeLayout.render('index', {content:"currentLesson"});
	},
});

FlowRouter.route('/lesson/show/:number',{
	name: 'ShowLesson',
	action(){
		BlazeLayout.render('index', {content:"showLesson"});
	},
});

FlowRouter.route('/lesson/new',{
	name: 'NewLesson',
	action(){
		BlazeLayout.render('index', {content:"newLesson"});
	},
});

// Questions
FlowRouter.route('/question/add',{
	name: 'AddQuestion',
	action(){
		BlazeLayout.render('index', {content:"addQuestion"});
	},
});

FlowRouter.route('/question/edit/:number',{
	name: 'EditQuestion',
	action(){
		BlazeLayout.render('index', {content:"editQuestion"});
	},
});

// Questions
FlowRouter.route('/quiz/add',{
	name: 'AddQuiz',
	action(){
		BlazeLayout.render('index', {content:"addQuiz"});
	},
});

FlowRouter.route('/quiz/edit/:number',{
	name: 'EditQuiz',
	action(){
		BlazeLayout.render('index', {content:"editQuiz"});
	},
});

FlowRouter.route('/quiz/edit/:number/questions',{
	name: 'EditQuiz',
	action(){
		BlazeLayout.render('index', {content:"editQuizQuestions"});
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

FlowRouter.route('/tests/classrooms', {
	name: 'TestsClassrooms',
	action() {
		BlazeLayout.render('test_classrooms');
	},
});

FlowRouter.route('/tests/lessons', {
	name: 'TestsLessons',
	action() {
		BlazeLayout.render('test_lessons');
	},
});

FlowRouter.route('/tests/clicks', {
	name: 'TestsClicks',
	action() {
		BlazeLayout.render('test_clicks');
	},
});

// 404
FlowRouter.notFound = {
	action() {
		BlazeLayout.render('not_found');
	},
};