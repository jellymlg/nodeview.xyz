import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  ErgoTransaction,
  ErgoTransactionOutput,
  IndexedErgoTransaction,
} from "./ergo-api";
import { RustModule } from "./wasm";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const feeTree: string =
  "1005040004000e36100204a00b08cd0279be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798ea02d192a39a8cc7a701730073011001020402d19683030193a38cc7b2a57300000193c2b2a57301007473027303830108cdeeac93b1a57304";

export function feeFromTx(
  tx: ErgoTransaction | IndexedErgoTransaction,
): number {
  const feeBox = tx.outputs.find(
    (b) => b.ergoTree == feeTree,
  ) as ErgoTransactionOutput;
  return feeBox ? feeBox.value : 0;
}

export function MainNetAddressFromErgoTree(ergoTree: string) {
  return RustModule.SigmaRust.Address.recreate_from_ergo_tree(
    RustModule.SigmaRust.ErgoTree.from_base16_bytes(ergoTree),
  ).to_base58(RustModule.SigmaRust.NetworkPrefix.Mainnet);
}
