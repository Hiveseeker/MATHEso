type TokenType = 'NUMBER' | 'IDENTIFIER' | 'OPERATOR' | 'WHITESPACE' | 'OPENPAREN' | 'CLOSEDPAREN' | 'SEMICOLON' | 'EOF';

interface Token {
    type: TokenType;
    value: String;
}

function lexer(input: string): Token[] {
    const tokens: Token[] = [];
    let i = 0;

    while (i < input.length) {
        const char = input[i];

        // Test if the current character is a digit
        if (/\d/.test(char)) {
            let num = char;

            // Continue testing for digits until whitespace or new character
            while (/\d/.test(input[i + 1])) {
                i++;
                num += input[i];
            }

            tokens.push({type: 'NUMBER', value: num});
            i++
            continue;
        }

        // Test if the current character is an identifier
        if (/[a-zA-Z]/.test(char)) {
            let identifier = char;
            tokens.push({type: 'IDENTIFIER', value: identifier});
            i++;
            continue;
        }

        // Test if the current character is an operator
        if (/[+\-*\/=]/.test(char)) {
            tokens.push({type: 'OPERATOR', value: char});
            i++;
            continue;
        }

        // Test if the current character is an '('
        if (char === '(') {
            let openparen = char
            tokens.push({type: 'OPENPAREN', value: openparen});
            i++;
            continue;
        }

        // Test if the current character is a ')'
        if (char === ')') {
            let closedparen = char;
            tokens.push({type: 'CLOSEDPAREN', value: closedparen});
            i++;
            continue;
        }
            
        // Test if the current character is a whitespace character
        if (/\s/.test(char)) {
            tokens.push({type: 'WHITESPACE', value: char});
            i++;
            continue;
        }
        
        // Test if the current character is a semicolon
        if (char === ';') {
            let semicolon = char;
            tokens.push({type: 'SEMICOLON', value: semicolon});
            i++;
            continue;
        }
    }
     
    // Return the discovered tokens when the end of the file is reached
    tokens.push({ type: 'EOF', value: '' });
    return tokens;
}
