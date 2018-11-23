import './addClassroom.html';

import { Classroom } from '/imports/api/classroom/classroom.js';

Template.addClassroom.onRendered(function(){
	var self = this;
	self.autorun(function(){
		
	});
});

Template.addClassroom.helpers({
	Classroom(){
		return Classroom;
	},
	
});

Template.addClassroom.events({
	'click #go-back': function(){
		FlowRouter.go("/classroom/show/");
    },
    'click #associateClassroom': function(){
		var password = prompt("Insert the password displayed on your raspberry");
		Meteor.call("associateTeacher", password, function (err, data) {
            if(err){
                console.log("Error: " + err);
            }else{
                alert("Associated Successfully with a room");
            }
    	});
	},
	'submit #connect-pi': function(event){
		// Prevent default browser form submit
	    event.preventDefault();
	 
	    // Get value from form element
	    const target = event.target;
	    const password = target.connectionCode.value;
		
		Meteor.call("associateTeacher", password, function (err, data) {
            if(err){
                console.log("Error: " + err);
                if (err.error === 'wrong-password')
                {
                	$("#error-code").text('Esse código de acesso não corresponde a nenhum Raspberry, tente novamente.')
                	$("#error-code").show();
                }
                if (err.error === 'already-associated')
                {
                	$("#error-code").text('Já se encontra ligado a essa sala de aula, volte atrás.')
                	$("#error-code").show();
                }
            }else{
                alert("A ligação foi efetuada com sucesso.");
            }
    	}); 
	
	    // Clear form
	    target.connectionCode.value = '';
	},
});


