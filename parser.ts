import { lex, Token } from "./lexer";
import { AST, Contract, Receive, Statement, EmitStatement } from "./ast";

export function parse(source: string): AST {
  const tokens = lex(source);
  let pos = 0;

  function peek(): Token | null {
    return tokens[pos] ?? null;
  }

  function consume(type?: string): Token {
    const t = tokens[pos++];
    if (!t) throw new Error("Unexpected end of input");
    if (type && t.type !== type) {
      throw new Error(`Expected ${type} but got ${t.type} (${t.value})`);
    }
    return t;
  }

  function parseContract(): Contract {
    consume("CONTRACT");
    const name = consume("IDENT").value;
    consume("{");
    const receives: Receive[] = [];
    while (peek() && peek()!.type === "RECEIVE") {
      receives.push(parseReceive());
    }
    consume("}");
    return { kind: "Contract", name, receives };
  }

  function parseReceive(): Receive {
    consume("RECEIVE");
    const name = consume("IDENT").value;
    consume("(");
    // arguments omitted for prototype
    consume(")");
    consume("{");
    const body: Statement[] = [];
    while (peek() && peek()!.type === "EMIT") {
      body.push(parseEmit());
    }
    consume("}");
    return { kind: "Receive", name, body };
  }

  function parseEmit(): EmitStatement {
    consume("EMIT");
    const eventName = consume("IDENT").value;
    consume("(");
    const args: string[] = [];
    if (peek() && peek()!.type === "IDENT") {
      args.push(consume("IDENT").value);
      while (peek() && peek()!.type === ",") {
        consume(",");
        args.push(consume("IDENT").value);
      }
    }
    consume(")");
    consume(";");
    return { kind: "Emit", eventName, args };
  }

  const contracts: Contract[] = [];
  while (peek()) {
    contracts.push(parseContract());
  }

  return { contracts };
}
