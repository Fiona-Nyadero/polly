let vocabulary = [];

async function loadData() {
    try {
        const response = await fetch('flashcards.json');
        vocabulary = await response.json();

        console.log("Data loaded successfully:", vocabulary);
        displayRandomWord();

    } catch (error) {
        console.log("Failed to load vocabulary:", error);
    }
}

function displayRandomWord() {
    let index = Math.floor(Math.random() * vocabulary.length);

    let word = vocabulary[index];
    let targetWord = word.translations.it;
    let nativeWord = word.translations.en;
    document.getElementById("target-word").textContent = targetWord;
    if (Array.isArray(nativeWord)) {
        let nativeArray = nativeWord.join(" / ");
        document.getElementById("native-word").textContent = nativeArray;
    } else {
        document.getElementById("native-word").textContent = nativeWord;
    }
    document.getElementById("native-word").style.display = "none";
}

document.getElementById("btn-next").addEventListener("click", displayRandomWord);

function flipCard() {
	document.getElementById("native-word").style.display = "block";
}

document.getElementById("btn-flip").addEventListener("click", flipCard);

function speakItalianWord() {
    let currentWord  = document.getElementById("target-word").textContent;

    let utterance = new SpeechSynthesisUtterance(currentWord);
    utterance.lang = "it-IT";
    window.speechSynthesis.speak(utterance);
}

document.getElementById("btn-speak").addEventListener("click", speakItalianWord);

loadData();