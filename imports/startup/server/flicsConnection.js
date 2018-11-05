//import Flic from 'node-flic-buttons';
//var flic = require('node-flic-buttons');

//var flic = new Flic("193.136.167.88","5551");

/*
 * This example program connects to already paired buttons and register event listeners on button events.
 * Run the newscanwizard.js program to add buttons.
 */
import { Raspberries } from '/imports/api/raspberries/raspberries.js';


var fliclib = require("./fliclibNodeJs.js");
var FlicClient = fliclib.FlicClient;
var FlicConnectionChannel = fliclib.FlicConnectionChannel;
var FlicScanner = fliclib.FlicScanner;

var rasp = Raspberries.findOne({"favorite":true});

var client = new FlicClient(rasp.ipAddress, 5551);


function listenToButton(bdAddr) {
	var cc = new FlicConnectionChannel(bdAddr);
	client.addConnectionChannel(cc);
	/*
	cc.on("buttonUpOrDown", function(clickType, wasQueued, timeDiff) {
		console.log(bdAddr + " " + clickType + " " + (wasQueued ? "wasQueued" : "notQueued") + " " + timeDiff + " seconds ago");
	});
	*/
	cc.on("buttonSingleOrDoubleClickOrHold", function(clickType, wasQueued, timeDiff) {
		console.log(bdAddr + " " + clickType + " " + (wasQueued ? "wasQueued" : "notQueued") + " " + timeDiff + " seconds ago");
	});
	cc.on("connectionStatusChanged", function(connectionStatus, disconnectReason) {
		console.log(bdAddr + " " + connectionStatus + (connectionStatus == "Disconnected" ? " " + disconnectReason : ""));
	});
}

client.once("ready", function() {
	console.log("Connected to daemon!");
	client.getInfo(function(info) {
		info.bdAddrOfVerifiedButtons.forEach(function(bdAddr) {
			listenToButton(bdAddr);
		});
	});
});

client.on("bluetoothControllerStateChange", function(state) {
	console.log("Bluetooth controller state change: " + state);
});

client.on("newVerifiedButton", function(bdAddr) {
	console.log("A new button was added: " + bdAddr);
	listenToButton(bdAddr);
});

client.on("error", function(error) {
	console.log("Daemon connection error: " + error);
});

client.on("close", function(hadError) {
	console.log("Connection to daemon is now closed");
});