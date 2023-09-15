function computeResult(secretWord, guess) {
    // guess = guess.toUpper();
    // secretWord = secretWord.toUpper();
    let resultArray = [];
    let secretCopy = secretWord;

    // check for correct
    for (let i = 0; i < secretWord.length; i++) {
        if (guess[i] === secretWord[i]) {
            resultArray[i] = "c";
            secretCopy = secretCopy.replace(guess[i], "");
        }
    }

    // check for misplaced, otherwise incorrect
    for (let i = 0; i < secretWord.length; i++) {
        if (secretCopy.includes(guess[i]) && resultArray[i] === undefined) {
            resultArray[i] = "m";
            secretCopy = secretCopy.replace(guess[i], "");
        }
    }

    // fill in rest of array with incorrect
    for (let i = 0; i < secretWord.length; i++) {
        if (resultArray[i] === undefined) {
            resultArray[i] = "i";
        }
    }
    
    let resultString = resultArray.join("");

    return resultString;
}

module.exports = { computeResult };