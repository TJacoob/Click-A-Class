import { AccountsTemplates } from 'meteor/useraccounts:core';
//import { TAPi18n } from 'meteor/tap:i18n';

AccountsTemplates.configure({
	// Behavior
	confirmPassword: true,
	enablePasswordChange: true,
	forbidClientAccountCreation: false,
	overrideLoginErrors: true,
	sendVerificationEmail: false,
	lowercaseUsername: false,
	focusFirstInput: true,

	// Appearance
	showAddRemoveServices: false,
	showForgotPasswordLink: false,
	showLabels: false,
	showPlaceholders: true,
	showResendVerificationEmailLink: false,
	hideSignInLink: true,
	hideSignUpLink: true,

	// Client-side Validation
	continuousValidation: false,
	negativeFeedback: false,
	negativeValidation: false,
	positiveValidation: false,
	positiveFeedback: false,
	showValidating: false,

	// Redirects
	homeRoutePath: '/',
	redirectTimeout: 4000,

});

var pwd = AccountsTemplates.removeField('password');
AccountsTemplates.removeField('email');
AccountsTemplates.addFields([
	{
		_id: "username",
		type: "text",
		displayName: "username",
		required: true,
		minLength: 5,
	},
	{
		_id: 'email',
		type: 'email',
		required: true,
		displayName: "email",
		re: /.+@(.+){2,}\.(.+){2,}/,
		errStr: 'Invalid email',
	},
	pwd
]);

AccountsTemplates.configure({
	onSubmitHook: ( error, state ) => {
		console.log("HERE");
		console.log(state === 'signIn');
		console.log(!error);
		if ( !error && (state === 'signIn') ) {
			// login successful, route to index
			FlowRouter.redirect("/dashboard");
		}
		else if ( !error && ( state === 'signUp') ) {
			// signup successful, route to roles
			FlowRouter.redirect("/dashboard");
		}
	},
	onLogoutHook: ( error, state ) => {
		console.log("LOGIN");
		FlowRouter.go("Login");
	},
});

//Accounts.emailTemplates.siteName = "Click-A-Class";
//Accounts.emailTemplates.from     = "Click-A-Class<no-reply@clickaclass.herokuapp.com>";

/*
Accounts.emailTemplates.verifyEmail = {
	subject() {
			return "";
	},
	text( user, url ) {
			let emailAddress   = user.emails[0].address,
					urlWithoutHash = url.replace( '#/', '' ),
					supportEmail   = "",
					emailBody      = ';

			return emailBody;
	}
};

Accounts.emailTemplates.resetPassword = {
	subject() {
			return "Click-A-Class - Recuperação de Password";
	},
	text( user, url ) {
			let username   = user.username,
					urlWithoutHash = url.replace( '#/', '' ),
					supportEmail   = "",
					emailBody      = "";

			return emailBody;
	}
};
*/

Accounts.onLogin(function(){
	//console.log("Here");
	// For some reason this redirects all the time, instead of just on Login
	//FlowRouter.go("Dashboard");
})

Accounts.onLogout(function(){
	FlowRouter.go("Login");	
})

Meteor.users.after.insert(function (userId, doc) {
  	Meteor.call( 'newTeacher', doc._id, function( error, response ) {
		if ( error ) {
			console.log( error );
		} else {
			//console.log(response);
		};
	});
});