var proxy_url = 'https://thingproxy.freeboard.io/fetch/';
var comments = [];


function fetchComments(main_url){
	comments = [];
	var voiceSettings = document.querySelector(".voiceSettings");
	var loading = document.querySelector(".loading");
	voiceSettings.classList.add("blur");
	loading.style.visibility = "visible";
	fetch(proxy_url + main_url).then(function (response) {
		return response.text();
	}).then(function(data){
	  // Convert the HTML string into a document object
	  var parser = new DOMParser();
	  var doc = parser.parseFromString(data, 'text/html');
	  var articles = doc.querySelectorAll("article");
		console.log(articles.length);
		if (articles.length!=0){
			for (i = 0; i < articles.length; i++){
				comments.push(articles[i].querySelector("span"));
				msg.text = comments[0].innerText;
				console.log(articles[i].querySelector("span"));
				voiceSettings.classList.remove("blur");
				loading.style.visibility = "hidden";
			}
		}
	}).catch(function (err) {
		// There was an error
		console.warn('Something went wrong.', err);
		voiceSettings.classList.remove("blur");
		loading.style.visibility = "hidden";
	});
}

const msg = new SpeechSynthesisUtterance();
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');

speechSynthesis.addEventListener('voiceschanged', addVoices);
function addVoices(){
	voices = this.getVoices();
	for (i = 0; i < voices.length; i++){
		if (voices[i].lang.includes("en")){
			voicesDropdown.innerHTML += "<option value=" + voices[i].name + ">" + voices[i].name + "(" + voices[i].lang + ")</option>";
		}
	}
}

voicesDropdown.addEventListener("change", setVoice);
function setVoice(){
	msg.voice = voices.find(voice => voice.name === this.value);
	toggle(true);
}

function toggle(restart){
	speechSynthesis.cancel();
	if (restart == true){
		if (comments.length === 0 ){
			console.log("No comments found");
			msg.text = "No comments found";
			speechSynthesis.speak(msg);
		} else {
			for (i=0; i < comments.length; i++){
				msg.text = "comment" + (i+1) + "  " + comments[i].innerText;
				speechSynthesis.speak(msg);
			}
		}
	}
}

var link = document.querySelector("#link");
link.addEventListener("change", function(){
	fetchComments(this.value);
	console.log(this.value);
})

var rate = document.querySelector('[name="rate"]');
rate.addEventListener('change', function(){
	msg['rate'] = this.value;
	toggle(true);
})
var pitch = document.querySelector('[name="pitch"]');
pitch.addEventListener('change', function(){
	msg['pitch'] = this.value;
	toggle(true);
})
