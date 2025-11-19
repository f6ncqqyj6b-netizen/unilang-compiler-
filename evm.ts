import { AST } from "../parser/ast";
import { CompileResult } from "../types";

export function codegenEVM(ast: AST): CompileResult {
  const abi = ast.contracts.flatMap(c =>
    c.receives.map(r => ({
      type: "function",
      name: r.name,
      inputs: [],
      outputs: []
    }))
  );

  return {
    backend: "evm",
    artifact: {
      abi,
      bytecode: "0x60006000" // placeholder
    }
  };
}
