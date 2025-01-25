export type SigmaRust = typeof import("ergo-lib-wasm-browser");

class Module {
  _ergo?: SigmaRust;

  async load(): Promise<SigmaRust> {
    if (this._ergo === undefined) {
      this._ergo = await import("ergo-lib-wasm-browser");
    }
    return this._ergo!;
  }

  get SigmaRust(): SigmaRust {
    return this._ergo!;
  }
}

export const RustModule: Module = new Module();
