var proxy_url = 'https://cors-anywhere.herokuapp.com/';
var main_url = 'https://www.linkedin.com/posts/marwa-omar-cheik_completion-certificate-for-front-end-web-activity-6684225532856471552-8rJC';
var comments = [];

fetch(proxy_url + main_url).then(function (response) {
	return response.text();
}).then(function(data){
  // Convert the HTML string into a document object
  var parser = new DOMParser();
  var doc = parser.parseFromString(data, 'text/html');
  var articles = doc.querySelectorAll("article");
  for (i = 0; i < articles.length; i++){
		comments.push(articles[i].querySelector("span"));
		msg.text = comments[0].innerText;
    console.log(articles[i].querySelector("span"));
  }
}).catch(function (err) {
	// There was an error
	console.warn('Something went wrong.', err);
});

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
		voicesDropdown.innerHTML += "<option value=" + voices[i].name + ">" + voices[i].name + "(" + voices[i].lang + ")</option>";
	}
}

voicesDropdown.addEventListener("change", setVoice);
function setVoice(){
	msg.voice = voices.find(voice => voice.name === this.value);
}

function toggle(restart){
	speechSynthesis.cancel();
	if (restart == true){
		speechSynthesis.speak(msg);
	}
}
