import { Meteor } from 'meteor/meteor';

import { Teacher } from '/imports/api/teacher/teacher.js';
import { Lesson } from '/imports/api/lesson/lesson.js';
import { Class } from '/imports/api/class/class.js';
import { Click } from '/imports/api/click/click.js';
import { Quiz } from '/imports/api/quiz/quiz.js';
import { Raspberries } from '/imports/api/raspberries/raspberries.js';
import { Classroom } from '/imports/api/classroom/classroom.js';

var id = "";

// Create Users	
if ( Meteor.users.find().count() == 0 )
{
	// John, Teacher
	var u1 = {
		"username": "john",
		"email": "john@teacher.com",
		"password": "123456",
	};
	id = Accounts.createUser(u1);
	console.log("Created user with username: "+u1.username+" and id "+id);	
	//Meteor.loginWithPassword(u1.username, u1.password);
	//console.log("Logged user with username: "+u1.username);

}

//console.log(id);

if ( Teacher.find().count() == 0)
{
	Meteor.call("newTeacher", id , function (err, data) { 
		if(!err) console.log("Created Teacher"); else console.log(err); });
	var t1 = {
		"name": "John Doe",
		"school": "IST Primary",
	};
}

if ( Raspberries.find().count() == 0)
{
	Meteor.call("newRaspberry", "0000000001c514cb","123.123.123.123", function (err, data) { 
		if(!err) console.log("Created Raspberry"); else console.log(err); });
}

if ( Classroom.find().count() == 0)
{
	Meteor.call("newClassroom", "0000000001c514cb", function (err, data) {
        if(!err) {console.log("Created Classroom");} else console.log(err); });
	let cr = Classroom.findOne();
	let t = Teacher.findOne({"user":id});
	Classroom.update(cr._id,{$push:{"teachers":t._id}});
}


/*
if ( Class.find().count() == 0)
{
	let c1 = {
		"name":"3º A",
		"notes":"Turno da Tarde, em geral bons alunos",
		"students":["João Maria", "Tiago Miguel", "João Antunes", "Pedro Afonso", "Inês Almeida", "Madalena Fidalgo", "Hugo Nicolau"],
	};
	let c2 = {
		"name":"1º B",
		"notes":"Turma dos maus alunos :(",
		"students":["Maria João", "Tiago Fernandes", "André Almeida", "João Nunes", "Ana Isabel", "Inês Afonso"],
	};
	Meteor.call("newClass", c1, function (err, data) {
        if(!err) console.log("Created Class"); else console.log(err); });
}
	
*/