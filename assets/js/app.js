
  var config = {
    apiKey: "AIzaSyAp9uVn0_BEp0NrHpjiKuMYGPpTXyCVbzA",
    authDomain: "train-scheduler-9f106.firebaseapp.com",
    databaseURL: "https://train-scheduler-9f106.firebaseio.com",
    projectId: "train-scheduler-9f106",
    storageBucket: "train-scheduler-9f106.appspot.com",
    messagingSenderId: "330006209312"
  };
  firebase.initializeApp(config);

  var database = firebase.database();



$("#submitbutton").on("click", function() {
    event.preventDefault();
    var newTrain = $("#trainname").val().trim();
    var destination = $("#destination").val().trim();
    var trainFrequency = $("#frequency").val().trim();
    console.log("trainFrequency: " + trainFrequency);
    var trainTime = $("#traintime").val().trim();
    console.log("traintime: " + trainTime); 
    var trainTimeConverted = moment(trainTime, "HH:mm").subtract(1, "years");
    console.log(trainTimeConverted);
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
    var diffTime = moment().diff(moment(trainTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);
    var tRemainder = diffTime % trainFrequency;
    console.log("REMAINDER: " + tRemainder);
    var minutesAway = trainFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + minutesAway);
    var nextArrival = moment().add(minutesAway, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextArrival).format("hh:mm"));
         
          database.ref().push({
          newTrain: newTrain,
          destination: destination,
          trainFrequency: trainFrequency,
          trainTime: trainTime,
          minutesAway: minutesAway,
          nextArrival: moment(nextArrival).format("hh:mm")
      });

      $("#trainname").val("");
      $("#destination").val("");
      $("#frequency").val("");
      $("#traintime").val("");
  });


    

        database.ref().on("child_added", function(childSnapshot) {
        console.log(childSnapshot.val().newTrain);
        console.log(childSnapshot.val().destination);
        console.log(childSnapshot.val().trainFrequency);
        console.log(childSnapshot.val().trainTime);
        var newRow = $('<tr>');
        $(newRow).append("<td class='trainname'>" + childSnapshot.val().newTrain +
        " </td><td>" + childSnapshot.val().destination +
        " </td><td>" + childSnapshot.val().trainFrequency + 
        " </td><td>" + childSnapshot.val().nextArrival +
        " </td><td>" + childSnapshot.val().minutesAway +
        " </td>");

     
        $("tbody").append(newRow);
      }, function(errorObject) {
          console.log("Errors handled: " + errorObject.code);
      });