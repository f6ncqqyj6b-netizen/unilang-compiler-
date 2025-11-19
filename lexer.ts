export interface Token {
  type: string;
  value: string;
}

const SYMBOLS = new Set(["{", "}", "(", ")", ";", ","]);
const KEYWORDS = new Set(["contract", "receive", "emit"]);

export function lex(source: string): Token[] {
  const tokens: Token[] = [];
  const re = /\s+|[{}(),;]|[A-Za-z_][A-Za-z0-9_]*/g;
  let match: RegExpExecArray | null;

  while ((match = re.exec(source)) !== null) {
    const text = match[0];
    if (/^\s+$/.test(text)) continue;

    if (SYMBOLS.has(text)) {
      tokens.push({ type: text, value: text });
    } else if (KEYWORDS.has(text)) {
      tokens.push({ type: text.toUpperCase(), value: text });
    } else if (/^[A-Za-z_]/.test(text)) {
      tokens.push({ type: "IDENT", value: text });
    } else {
      throw new Error(`Unexpected token: ${text}`);
    }
  }

  return tokens;
}
