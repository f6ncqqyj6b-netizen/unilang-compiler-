import { AST } from "../parser/ast";
import { CompileResult } from "../types";

export function codegenTON(ast: AST): CompileResult {
  const funcs = ast.contracts.flatMap(c =>
    c.receives.map(r => `() ${c.name}_recv_${r.name}() inline { ;; }`)
  );

  const source = funcs.join("\n\n");

  return {
    backend: "ton",
    artifact: {
      source
    }
  };
}
