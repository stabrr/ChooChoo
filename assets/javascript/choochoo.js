//connect to firebase copied from my firebase

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

//function on submit to read information and add to firebase
$("#submit-button").on("click", function(){
	event.preventDefault();
	//input values
    var train=$("#train-name").val().trim();    
    var destination=$("#train-destination").val().trim();    
    var start=$("#train-start").val().trim();    
    var frequency=$("#train-frequency").val().trim();
   
    //create an object so I can push to firebase
    var newEmployee = {
    	name: train,
    	role: destination,
    	start: start,
    	rate: frequency
    };
    //push object into firebase
    database.ref().push(newEmployee);
    //clear the input fields
    $("#train-name").val("");
    $("#train-destination").val("");
    $("#train-start").val("");
    $("#train-frequency").val("");


})
//function to train information in firebase into a table
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  

  // Store everything in firebase into a variable.
  var train = childSnapshot.val().name;
  var destination = childSnapshot.val().role;
  var start = childSnapshot.val().start;
  var  frequency= childSnapshot.val().rate;
  

	// frequncy of train
	var tFrequency = frequency;
    // start time
    var firstTime = start;
    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
    // Current Time
    var currentTime = moment();
    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm");
    //Output to table
    $("#employee-table > tbody").append("<tr><td>" + train + "</td><td>" + destination + "</td><td>" +
  frequency + "</td><td>" + nextTrain + "</td><td>" + tMinutesTillTrain + "</td></tr>");

 })