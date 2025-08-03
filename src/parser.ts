import type { Token } from "./lexer.ts";

interface Program {
    type: 'Program';
    body: ASTNode[];
}
interface NumberLiteral {
    type: 'NumberLiteral';
    value: string;
}

interface Identifier {
    type: 'Identifier';
    name: string;
}

interface BinaryExpression {
    type: 'BinaryExpression';
    operator: string;
    left: ASTNode;
    right: ASTNode;
}

interface ParenGroup {
    type: 'ParenGroup';
    opener: string;
    expressions: ASTNode[];
    closer: string;
}

type ASTNode = NumberLiteral | Identifier | BinaryExpression | ParenGroup | Program;

export function parse(tokens: Token[]): ASTNode {
    let current = 0;

    function walk(): ASTNode {
        let token = tokens[current];

        if (token.type === 'NUMBER') {
            current++;
            return {type: 'NumberLiteral', value: token.value};
        }
        if (token.type === 'IDENTIFIER') {
            current++;
            return {type: 'Identifier', name: token.value};
        }
        if (token.type === 'OPERATOR' && token.value === '=') {
            current++

            const left = tokens[current - 2];
            const right = walk();

            return {
                type: 'BinaryExpression',
                operator: '=',
                left: {type: 'Identifier', name: 'left'},
                right
            };
        }
        if (token.type === 'OPERATOR' && /[+\-*/]/.test(token.value)) {
            current++;

            const left = walk()
            const operator = token.value
            const right = walk()

            return {
                type: 'BinaryExpression',
                operator: operator,
                left,
                right
            }
        }
        if (token.type === 'OPENPAREN') {
            const opener = token.value;


            const expressions: ASTNode[] = []

            while (tokens[current] && tokens[current].type !== 'CLOSEDPAREN') {
                current++;
                if (tokens[current]?.type === 'EOF') {
                    throw new Error("Expected closing parenthesis ')'");
                }

                expressions.push(walk());

            }

            const closer = tokens[current].value;


            current++;

            return {
                type: 'ParenGroup',
                opener,
                expressions,
                closer
            };
        }
        if (token.type === 'OPENCURLY') {
            const opener = token.value;
            const expressions: ASTNode[] = []

            while (tokens[current] && tokens[current].type !== 'CLOSEDCURLY') {
                current++;
                if (tokens[current]?.type === 'EOF') {
                    throw new Error("Expected closing curly bracket '}'");
                }

                expressions.push(walk());

            }

            const closer = tokens[current].value;

            current++;

            return {
                type: 'ParenGroup',
                opener,
                expressions,
                closer
            };
        }
    }

    const body: ASTNode[] = [];

    while (current < tokens.length && tokens[current].type !== 'EOF') {
        if (tokens[current].type === 'WHITESPACE') {
            current++;
            continue;
        }
        body.push(walk());
    }

    return {
        type: 'Program',
        body
    };
}
