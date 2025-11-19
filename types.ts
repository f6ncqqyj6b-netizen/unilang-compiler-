export type Backend = "evm" | "ton";

export interface CompileOptions {
  backend: Backend;
}

export interface CompileResult {
  backend: Backend;
  artifact: any;
}
