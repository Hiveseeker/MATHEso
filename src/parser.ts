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

type ASTNode = NumberLiteral | Identifier | BinaryExpression;

function parse(tokens: Token[]): ASTNode {
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
    }
}
