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
  // var train = childSnapshot.val().name;
  // var destination = childSnapshot.val().role;
  // var start = childSnapshot.val().start;
  // var rate = childSnapshot.val().frequency;

  // Employee Info
  // console.log(train);
  // console.log(destination);
  // console.log(start);
  // console.log(rate);
 })