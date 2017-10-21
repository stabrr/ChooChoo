var config = {
    apiKey: "AIzaSyC4SakjHfRJSc4N2CLCeVAtfiLMC01618I",
    authDomain: "choochoo-bfcf2.firebaseapp.com",
    databaseURL: "https://choochoo-bfcf2.firebaseio.com",
    projectId: "choochoo-bfcf2",
    storageBucket: "",
    messagingSenderId: "1074095547745"
};
firebase.initializeApp(config);
var database =firebase.database();

$("#submit-button").on("click", function(){
	event.preventDefault();
    console.log("i hit submit!");
    var train=$("#train-name").val().trim();
    console.log(train);
    var destination=$("#train-destination").val().trim();
    console.log(destination);
    var start=$("#train-start").val().trim();
    console.log(start);
    var frequency=$("#train-frequency").val().trim();
    console.log(frequency);

    var newEmployee = {
    	name: train,
    	role: destination,
    	start: start,
    	rate: frequency
    };
    database.ref().push(newEmployee);

    $("#train-name").val("");
    $("#train-destination").val("");
    $("#train-start").val("");
    $("#train-frequency").val("");


})

database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var train = childSnapshot.val().name;
  var destination = childSnapshot.val().role;
  var start = childSnapshot.val().start;
  var  frequency= childSnapshot.val().rate;
  var minutesAway = "10"

  // Employee Info
  console.log(train);
  console.log(destination);
  console.log(start);
  console.log(frequency);
//
var tFrequency = frequency;

    // Time is 3:30 AM
    var firstTime = start;

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
    console.log("ft"+moment(firstTimeConverted).format("hh:mm"));

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));


    console.log("ft"+moment(firstTimeConverted).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm");
    console.log("ARRIVAL TIME: " + nextTrain);

//





    $("#employee-table > tbody").append("<tr><td>" + train + "</td><td>" + destination + "</td><td>" +
  frequency + "</td><td>" + nextTrain + "</td><td>" + tMinutesTillTrain + "</td></tr>");

 })