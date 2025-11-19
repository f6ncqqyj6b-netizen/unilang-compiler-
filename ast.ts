export interface Contract {
  kind: "Contract";
  name: string;
  receives: Receive[];
}

export interface Receive {
  kind: "Receive";
  name: string;
  body: Statement[];
}

export type Statement = EmitStatement;

export interface EmitStatement {
  kind: "Emit";
  eventName: string;
  args: string[];
}

export interface AST {
  contracts: Contract[];
}
