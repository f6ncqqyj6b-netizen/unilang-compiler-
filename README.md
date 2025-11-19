# UNILANG Compiler

This package provides a TypeScript implementation of a prototype UNILANG compiler.

## Features

- Tokenizer / lexer
- Minimal parser for `contract` / `receive` / `emit`
- Simple semantic checks (duplicate names)
- Mock EVM and TON code generation

## Usage

```bash
npm install
npm run build
node dist/index.js examples/HelloWorld.unilang evm
```
