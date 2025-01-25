export function fromHex(s: string): Uint8Array {
  return Uint8Array.from(Buffer.from(s, "hex"));
}

export function toHex(arr: Uint8Array): string {
  return Buffer.from(arr).toString("hex");
}
