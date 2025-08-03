import { lexer } from './lexer.ts';
import { parse } from './parser.ts';

const code = "((20 + 6) * 8 + 32)";
const tokens = lexer(code);
const ast = parse(tokens);
console.log(tokens)
console.log("________________________________________")

console.log(JSON.stringify(ast, null, 2));