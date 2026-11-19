$(function() { // Makes sure that your function is called once all the DOM elements of the page are ready to be used.
    
    // Called function to update the name, happiness, and weight of our pet in our HTML
    checkAndUpdatePetInfoInHtml();
  
    // When each button is clicked, it will "call" function for that button (functions are below)
    $('.treat-button').click(clickedTreatButton);
    $('.play-button').click(clickedPlayButton);
    $('.exercise-button').click(clickedExerciseButton);
    //You are able to change the name of the pet at anytime now.
    $('.change-name-button').click(clickedChangeNameButton);
    $('.swim-button').click(clickedSwimButton);

  

  
    
  })
    // Add a variable "pet_info" equal to a object with the name (string), weight (number), and happiness (number) of your pet
    var pet_info = {name:"My Pet Name", weight:10, happiness:50};
  
    function clickedTreatButton() {
         // Increase pet happiness
      pet_info['happiness'] += 4;
        // Increase pet weight
      pet_info['weight'] += 2;
      //make the grape go to his mouth and then disappear
      feedGrape();
      //play sound
      //$ Fix 
     playSound('sounds/eating_sounds.mp3');
      
      checkAndUpdatePetInfoInHtml();
    }
    
    function clickedPlayButton() {
      // Increase pet happiness
      pet_info['happiness'] += 5;
      // Decrease pet weight
      pet_info['weight'] -= 3;
      checkAndUpdatePetInfoInHtml();
      quackSound();
    }
    

    function clickedExerciseButton() {
      // Decrease pet happiness
      pet_info['happiness'] -= 2;
      // Decrease pet weight
      pet_info['weight'] -= 5;
      rotatePet();
      checkAndUpdatePetInfoInHtml();
    }
  
  function clickedSwimButton() {
      // Decrease pet happiness
      pet_info['happiness'] += 2;
      // Decrease pet weight
      pet_info['weight'] -= 1;
      swim();
      checkAndUpdatePetInfoInHtml();
    }

    function checkAndUpdatePetInfoInHtml() {
      checkWeightAndHappinessBeforeUpdating();  
      updatePetInfoInHtml();
    }
    
    function checkWeightAndHappinessBeforeUpdating() {
      // Add conditional so if weight is lower than zero.
    
      if (pet_info['weight'] < 1) {
        pet_info['weight'] = 1;
      }
      // Add conditional so if happiness is lower than zero.
      if (pet_info['happiness'] < 0) {
        pet_info['happiness'] = 0;
      }
        //These two conditionals will make sure that the weight and happiness of the pet do not exceed 100.
       if (pet_info['happiness'] > 100) {
        pet_info['happiness'] = 100;
      }

      if (pet_info['weight'] > 100) {
        pet_info['weight'] = 100;
      }

    //@ This is going to make the pet appear differently depending on the weight and happiness of the pet.
      if (pet_info['weight'] > 50) {
        $('.pet-image').attr('src', 'images/pet_fat.png');
      } else if (pet_info['happiness'] <= 20) {
        $('.pet-image').attr('src', 'images/pet_sad.png');
      } else {
        $('.pet-image').attr('src', 'images/pet.png');
      }
    }
    

function clickedChangeNameButton() {

    // Get the new name entered by the user
    var newName = $('#pet-name-input').val().trim();

    // Check that the user entered a name
    if (newName !== "") {

        // Update the name in the pet_info object
        pet_info['name'] = newName;

        // Update the pet information displayed in HTML
        checkAndUpdatePetInfoInHtml();

        //* Clear the input field
        $('#pet-name-input').val("");

        $('#pet-name-input').hide();
        $('.change-name-button').hide();

    } else {

        // Alert the user if the input is empty
        alert("Please enter a valid pet name!");

    }
}

function feedGrape() {

    // Select the grape and pet images
    var grape = $('.grape');
    var pet = $('.pet-image');

    //& Get the pet's position
    var petPosition = pet.position();
    //& Get the current coordinates of the first element in the set of matched elements, relative to the offset parent.

    // Starting position: top of the pet
  
    var startX = petPosition.left + pet.width() * 0.5;
    var startY = petPosition.top + pet.height() - 240;


    // Destination: pet's mouth
    var mouthX = petPosition.left + pet.width() * 0.5;
    var mouthY = petPosition.top + pet.height() * 0.65;

    // Stop previous animations
    grape.stop(true, true);

    // Reset grape to starting position
    grape.css({
        left: startX,
        top: startY,
        width: '40px',
        opacity: 1
    });

    // Show the grape
    grape.show();

    // Move grape toward mouth
    grape.animate({
        left: mouthX,
        top: mouthY,
        width: '5px',
        opacity: 0
    }, 1000, function() {

        // Hide grape after animation
        grape.hide();

    });
}
 

function playSound() {
  
    // Create a new audio object with the sound file
    var audio = new Audio('sounds/eating_sounds.mp3');

    // Play the eating sound
    audio.play();
    //
    
}

function quackSound() {
  
    // Create a new audio object with the sound file
    var audio = new Audio('sounds/quack.mp3');

    // Play the exercise sound
    audio.play();
    //
    
}
function rotatePet() {
    var pet = $('.pet-image');

    //& Remove the swim animation first
    pet.removeClass('swimming rotate-pet');

    // Reset the animation
    void pet[0].offsetWidth;

    // Start exercise animation
    pet.addClass('rotate-pet');

    // Remove the class after the animation finishes
    setTimeout(function() {
        pet.removeClass('rotate-pet');
    }, 1000);
}

function swim() {
    var pet = $('.pet-image');
    var water = $('.water');

    // Remove conflicting animations
    pet.removeClass('rotate-pet swimming');

    // Reset the animation
    void pet[0].offsetWidth;

    // Start the swimming animation
    pet.addClass('swimming');

    // Show the water
    water.stop(true, true).fadeIn(200);

    // Hide the water when the animation ends
    setTimeout(function() {
        pet.removeClass('swimming');
        water.fadeOut(200);
    }, 1000);
}

    // Updates your HTML with the current values in your pet_info object
    function updatePetInfoInHtml() {
      $('.name').text(pet_info['name']);
      $('.weight').text(pet_info['weight']);
      $('.happiness').text(pet_info['happiness']);
    }
