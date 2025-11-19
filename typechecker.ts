import { AST } from "../parser/ast";

export function typecheck(ast: AST): void {
  const contractNames = new Set<string>();

  for (const c of ast.contracts) {
    if (contractNames.has(c.name)) {
      throw new Error(`Duplicate contract name: ${c.name}`);
    }
    contractNames.add(c.name);

    const receiveNames = new Set<string>();
    for (const r of c.receives) {
      if (receiveNames.has(r.name)) {
        throw new Error(`Duplicate receive name in contract ${c.name}: ${r.name}`);
      }
      receiveNames.add(r.name);
    }
  }
}
