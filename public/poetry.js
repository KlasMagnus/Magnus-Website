function createPoem(){

    
    var subjects = ["pair of pants ", "boat ", "jaguar"];
    var subjectNames = ["Bob", "Gunilla", "Joel", "Miranda"];

    var adjective = ["wouldn't eat ", "loved to eat "];

    var targetNoun = ["corn on the cob", "a slimy blob"];

    var poem = "There once was a " + getRandomWordFromArray(subjects) + " named " + getRandomWordFromArray(subjectNames) +
                " who " + getRandomWordFromArray(adjective) + "."
    document.getElementById("poetry").innerHTML=poem;

}

function getRandomWordFromArray(arrayOfWords){
    var index = Math.floor(Math.random() * arrayOfWords.length);
    return arrayOfWords[index];
}

function getWordsThatRhyme(arrayOfWords){

    //TODO: some kind of map?

    arrayofWords.forEach(element => {
        
    });

}

function getLastSyllable(word){
    
    var vowels = ["a", "e", "i",  "o", "u"];

    var lastVowelPosition;
    
    //for now we ignore last position of word. TODO: add support for words with vowel in last position, such as 'take'
    for (var lastVowelPosition = word.length-1; i > 0; i--) {
        if (word.getCharAt(lastVowelPosition).find(vowels)){
            return word.substring(lastVowelPosition);

        }
    }
}

