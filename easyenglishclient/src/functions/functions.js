export function say(text) {
  var msg = new SpeechSynthesisUtterance();
  var voices = window.speechSynthesis.getVoices();
  msg.voice = voices[2];
  msg.volume = 1;
  msg.rate = 0.6; // speed
  msg.pitch = 0.8;
  msg.text = text;
  msg.lang = "en-US";
  speechSynthesis.speak(msg);
}
