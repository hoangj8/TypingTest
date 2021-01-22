const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");

var timer = [0,0,0,0];
var testBank = [];
var interval;
var timerRunning=false;
var errors = 0;


//load phrases into testBank
testBank.push("She sells seashells by the seashore.")
testBank.push("In for a penny, in for a pound.")
testBank.push("A bird in the hand is worth two in the bush.")
testBank.push("Don't count your chickens before they hatch.")
testBank.push("Good things come to those who wait.")
testBank.push("You can't judge a book by its cover.")
testBank.push("You can't make an omelet without breaking some eggs.")
testBank.push("You can catch more flies with honey than you can with vinegar.")


//random number generator
function randomInt(max)
{
	//the Math.random function returns a number between 0 and 1, so if we multiply it with our
	//max, we should get a random number between 0 and max
	let random = Math.random();
	return Math.floor(random*max);
}
//change the originText by selecting one at random from the testBank
document.querySelector("#origin-text p").innerHTML=testBank[randomInt(testBank.length)];
var originText = document.querySelector("#origin-text p").innerHTML;


// Add leading zero to numbers 9 or below (purely for aesthetics):
function doubleDigits(num)
{
	var output=num;
	if (num<10){
		output="0"+num;
	}
	return output;
}

// Run a standard minute/second/hundredths timer:
function runTimer(){
	var currentTime=doubleDigits(timer[0])+ ":" + doubleDigits(timer[1]) + ":" + doubleDigits(timer[2]);
	theTimer.innerHTML=currentTime;
	timer[3]++;
	timer[2]++;
	if(timer[3]%100==0){
		timer[2]=0;
		timer[1]++;
	}
	if(timer[3]%6000==0){
		timer[1]=0;
		timer[0]++;
	}
}

// Match the text entered with the provided text on the page:
function spellCheck(){
	var textEntered = testArea.value;
	var originTextMatch=originText.substring(0,textEntered.length);
	var numWords = originText.split(/\s./).length;
	if(originTextMatch==textEntered && timerRunning)
	{
		testWrapper.style.border="10px solid blue";
	}
	if(originTextMatch!=textEntered && timerRunning)
	{
		testWrapper.style.border="10px solid red";
		errors++;
	}

	if(textEntered == originText){
		clearInterval(interval);
		timerRunning=false;
		testWrapper.style.border="10px solid green";
		console.log("done");
		console.log("timer" + timer[3]);
		testArea.value=textEntered + "\n\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~"
								   + "\n# Words: "+ numWords
								   + "\nErrors: " + errors
							       + "\nWPM: " + (numWords/(timer[3]/100/60)).toFixed(2);
	}
}

// Start the timer:
function start(){
	var textLength = testArea.value.length+1;
	console.log('started');
	if(textLength==1 && !timerRunning){
		interval = setInterval(runTimer, 10);
		timerRunning = true;
	}
}

// Reset everything:
function reset(){
	testArea.value="";
	clearInterval(interval);
	timer=[0,0,0,0];
	theTimer.innerHTML="00:00:00";
	errors=0;
	testWrapper.style.borderColor="gray";
	document.querySelector("#origin-text p").innerHTML=testBank[randomInt(testBank.length-1)];
	originText = document.querySelector("#origin-text p").innerHTML;
}

// Event listeners for keyboard input and the reset button:
testArea.addEventListener("keypress",start);
testArea.addEventListener("keyup",spellCheck);
resetButton.addEventListener("click",reset);