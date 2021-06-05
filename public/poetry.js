function createPoem(){

    
    var subjects = ["pair of pants ", "boat ", "jaguar"];
    var subjectNames = ["Bob", "Gunilla", "Joel", "Miranda"];

    var adjective = ["wouldn't eat ", "loved to eat "];

    var targetNoun = ["corn on the cob", "a slimy blob"];

    var subject = getRandomWordFromArray(subjects);
    var subjectName = getRandomWordFromArray(subjectNames);

    var poem = "There once was a " + subject + " named " + subjectName +
                " who " + getRandomWordFromArray(adjective) + getRandomWordFromArray(getWordsThatRhyme(subjectName, targetNoun));
    document.getElementById("poetry").innerHTML=poem;

}

function getRandomWordFromArray(arrayOfWords){
    var index = Math.floor(Math.random() * arrayOfWords.length);
    return arrayOfWords[index];
}

function getWordsThatRhyme(word, potentialRhymes){

    lastSyllableToCheck = getLastSyllable(word);

    var rhymes = [];

    potentialRhymes.forEach(element => {
        //if match put in rhymes
        if (getLastSyllable(element) == lastSyllableToCheck){
            rhymes.push(element);
        }
    });
    return rhymes;

}

function getLastSyllable(word){
    
    var vowels = ["a", "e", "i",  "o", "u"];

    //for now we ignore last position of word. TODO: add support for words with vowel in last position, such as 'take'
    for (var i = word.length-1; i > 0; i--) {
        if (vowels.indexOf(word[i])){
            return word.substring(i);

        }
    }
}

