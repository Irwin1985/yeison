/********************************************************************
 * TOKENIZER
********************************************************************/
// Tokenizer spec.
var Spec = [
    // --------------------------------------
    // Newline:
    [/^\n/, null],

    // --------------------------------------
    // Whitespace:
    [/^\s+/, null],

    // --------------------------------------
    // Symbols and delimiters:
    [/^{/, '{'],  // LeftBrace
    [/^}/, '}'],  // RightBrace
    [/^\[/, '['], // LeftBracket
    [/^\]/, ']'], // RightBracket
    [/^,/, ','],  // Comma
    [/^\:/, ':'], // Colon


    // --------------------------------------
    // Keywords
    [/^\btrue\b/, 'TRUE'],
    [/^\bfalse\b/, 'FALSE'],
    [/^\bnull\b/, 'NULL'],

    // --------------------------------------
    // Numbers:
    [/^\-?\d+(\.\d+)?/, 'NUMBER'],

    // --------------------------------------
    // Double quoted String:
    [/^"/, 'STRING'],
];

var _scannerString;
var _scannerCursor;
var _scannerLine = 1;

function _scanTokens(source) {
    _scannerString = source;
    _scannerCursor = 0; // track the position of each character

    var tokens = [];

    while (true) {
        var token = _getNextToken();
        if (token == null) {
            break;
        }
        tokens.push(token);
    }

    tokens.push({
        type: 'EOF',
        value: null
    });

    return tokens;
}

/*
* Obtains next token.
*/
function _getNextToken() {
    if (_scannerCursor >= _scannerString.length) {
        return null;
    }
    var string = _scannerString.slice(_scannerCursor);

    for (var i = 0; i < Spec.length; i++) {
        var regexp = Spec[i][0];
        var tokenType = Spec[i][1];        
        var tokenValue = _matchRegEx(regexp, string);

        if (tokenValue == null) {
            continue;
        }

        if (tokenValue == '\n') {
            _scannerCursor++;
            _scannerLine++;
            continue;
        }

        if (tokenType == null) {
            return _getNextToken();
        }

        // handle string token
        if (tokenType == 'STRING') {
            return _parseString();
        }

        return {
            type: tokenType,
            value: tokenValue
        };
    }

    throw new SyntaxError('Unexpected token: "' + string[0] + '" at line ' + _scannerLine + '.');
}

/**
 * Parses a string token.
 */
function _parseString() {
    var lexeme = '';
    var ch = '';
    while (true) {
        ch = _scannerString[_scannerCursor++];
        if (ch == '"') {
            break;
        }
        lexeme += ch;
    }
    return {
        type: 'STRING',
        value: lexeme
    }
}

/*
* Matches a token for a regular expression.
*/
function _matchRegEx(regexp, string) {
    var matched = regexp.exec(string);
    if (matched == null) {
        return null;
    }
    _scannerCursor += matched[0].length;
    return matched[0];
}

// test the tokenizer
var tokens = _scanTokens('{"name": "Yeison", "age": 25, "isMale": true, "address": {"city": "Bogota", "country": "Colombia"}, "salary": 1000.50, "skills": ["C#", "JavaScript", "SQL"]}');
console.log(tokens);