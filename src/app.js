'use strict';

document.addEventListener('DOMContentLoaded', init());

function init() {
    var userInput = document.getElementById('userInput');

    userInput.addEventListener('input', function(e) {
        e.stopPropagation();

        displayResults();
    });

    userInput.addEventListener('focus', function(e) {
        e.stopPropagation();
        displayResults();
    });

    displayResults();
}

function displayResults() {
    var userInput = document.getElementById('userInput');
    var highestDisplay = document.getElementById('highestDisplay');
    var highestEl = document.getElementById('highest');
    var lowestDisplay = document.getElementById('lowestDisplay');
    var lowestEl = document.getElementById('lowest');
    var tieDisplay = document.getElementById('tieDisplay');
    var tieEl = document.getElementById('tie');

    if (userInput.value.length > 0) {
        var highestLowest = processInput(userInput.value);

        if (highestLowest.highest.count === highestLowest.lowest.count) {
            tieEl.innerHTML = highestLowest.highest.char + ':' + highestLowest.highest.count;
            highestDisplay.style.display = 'none';
            lowestDisplay.style.display = 'none';
            tieDisplay.style.display = 'block';
        } else {
            highestEl.innerHTML = highestLowest.highest.char + ':' + highestLowest.highest.count;
            lowestEl.innerHTML = highestLowest.lowest.char + ':' + highestLowest.lowest.count;
            highestDisplay.style.display = 'block';
            lowestDisplay.style.display = 'block';
            tieDisplay.style.display = 'none';
        }
    } else {
        highestDisplay.style.display = 'none';
        lowestDisplay.style.display = 'none';
        tieDisplay.style.display = 'none';
    }
}

function processInput(str) {
    var charOccurrences = countCharOccurrences(str);

    return {
        highest: findHighestLowest(charOccurrences),
        lowest: findHighestLowest(charOccurrences, true)
    };
}

function countCharOccurrences(str) {
    var charOccurrences = {};

    for (var i = 0, n = str.length, char = ''; i < n; i++) {
        char = str.charAt(i);

        if (charOccurrences[char] === undefined) {
            charOccurrences[char] = {
                char: char,
                count: 1
            };
        } else {
            charOccurrences[char].count++;
        }
    }

    return charOccurrences;
}

function findHighestLowest(charOccurrences, findLowest) {
    var result;

    for (var key in charOccurrences) {
        var currCharOccur = charOccurrences[key];

        if (result === undefined) {
            result = currCharOccur;
        } else if (findLowest ? result.count > currCharOccur.count : result.count < currCharOccur.count) {
            result = currCharOccur;
        } else if (result.count === currCharOccur.count) {
            if (result.char.codePointAt(0) > currCharOccur.char.codePointAt(0)) {
                result = currCharOccur;
            }
        }
    }

    return result;
}
