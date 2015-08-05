'use strict';

document.addEventListener('DOMContentLoaded', init());

function init() {
    document.getElementById('userInput').addEventListener('input', function() {
        var highestEl = document.getElementById('highest');
        var lowestEl = document.getElementById('lowest');
        var tieEl = document.getElementById('tie');

        if (this.value.length > 0) {
            var highestLowest = processInput(this.value);

            if (highestLowest.highest.count === highestLowest.lowest.count) {
                tieEl.innerHTML = highestLowest.highest.char + ':' + highestLowest.highest.count;
                highestEl.innerHTML = '';
                lowestEl.innerHTML = '';
            } else {
                highestEl.innerHTML = highestLowest.highest.char + ':' + highestLowest.highest.count;
                lowestEl.innerHTML = highestLowest.lowest.char + ':' + highestLowest.lowest.count;
                tieEl.innerHTML = '';
            }
        } else {
            highestEl.innerHTML = '';
            lowestEl.innerHTML = '';
            tieEl.innerHTML = '';
        }
    });
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
