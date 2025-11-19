import * as fs from "fs";
import { parse } from "./parser/parser";
import { typecheck } from "./semantic/typechecker";
import { codegenEVM } from "./codegen/evm";
import { codegenTON } from "./codegen/ton";
import { Backend, CompileOptions, CompileResult } from "./types";

export function compileSource(source: string, options: CompileOptions): CompileResult {
  const ast = parse(source);
  typecheck(ast);
  if (options.backend === "evm") return codegenEVM(ast);
  if (options.backend === "ton") return codegenTON(ast);
  throw new Error(`Unsupported backend: ${options.backend}`);
}

export function compileFile(path: string, options: CompileOptions): CompileResult {
  const src = fs.readFileSync(path, "utf8");
  return compileSource(src, options);
}

if (require.main === module) {
  const [,, file, backendArg] = process.argv;
  if (!file) {
    console.error("Usage: node dist/index.js <file.unilang> [evm|ton]");
    process.exit(1);
  }
  const backend: Backend = (backendArg as Backend) || "evm";
  const result = compileFile(file, { backend });
  console.log(JSON.stringify(result, null, 2));
}
