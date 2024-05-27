const synth = window.speechSynthesis;

const btn = document.querySelector('#btn');
const qn = document.querySelector("#qn");
const ans = document.querySelector("#ans");

let cnt = 0;
let nOfTxt = txt.length;

qn.value = txt[0].question;

// Init voices array
let voices = [];

const getVoices = () => {
  voices = synth.getVoices();

  // Loop through voices and create an option for each one
  voices.filter((word) => word.name.includes("Daniel")).forEach(voice => {
    // voices.filter((word) => word.lang.includes("en-GB")).forEach(voice => {
      // Create option element
    const option = document.createElement('option');
    // Fill option with voice and language
    option.textContent = voice.name + '(' + voice.lang + ')';

    // Set needed option attributes
    option.setAttribute('data-lang', "en-GB");
    option.setAttribute('data-name', "Daniel");
    // voiceSelect.appendChild(option);
  });
};


getVoices();
if (synth.onvoiceschanged !== undefined) {
  synth.onvoiceschanged = getVoices;
}

// Speak
const speak = (flag) => {
    // Check if speaking
    if (synth.speaking) {
      console.error('Already speaking...');
      return;
    }
    if (qn.value !== '') {
  
      // Get speak text
    let speakText = ""
    if (flag === "qn")
        speakText = new SpeechSynthesisUtterance(qn.value);
    else
        speakText = new SpeechSynthesisUtterance(ans.value);
  
      // Speak end
      speakText.onend = e => {
        console.log('Done speaking...');
      };
  
      // Speak error
      speakText.onerror = e => {
        console.error('Something went wrong');
      };
  
      // Loop through voices
      voices.forEach(voice => {
        if (voice.name === "Daniel") {
          speakText.voice = voice;
        }
      });

      // Set pitch and rate
      speakText.rate = 1;
      speakText.pitch = 1;
      // Speak
      synth.speak(speakText);
    }
  };
  
speak("qn");

btn.addEventListener('click', e => {
    if (nOfTxt > cnt && btn.innerHTML === "Answer") {
        ans.value = txt[cnt].answer;
        ans.style.height = 'auto';
        ans.style.height = ans.scrollHeight + 'px';
        speak("ans");
        
        if (nOfTxt === cnt + 1) {
            btn.innerHTML = "Return";
            cnt = 0;
        } else {
            btn.innerHTML = "Next";
            cnt++;
        }
    } else if (nOfTxt > cnt && (btn.innerHTML === "Next" || btn.innerHTML === "Return")){
        qn.value = txt[cnt].question;
        qn.style.height = 'auto';
        qn.style.height = qn.scrollHeight + 'px';
        ans.value = "";
        btn.innerHTML = "Answer";
        speak("qn");
    } 
});
