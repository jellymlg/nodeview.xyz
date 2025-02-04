import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  ErgoApi,
  ErgoTransaction,
  ErgoTransactionOutput,
  IndexedErgoBox,
  IndexedErgoTransaction,
} from "./ergo-api";
import { RustModule } from "./wasm";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { Column } from "@tanstack/react-table";
import { NETWORK } from "./network";

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

export function ErgoTreeFromMainNetAddress(address: string) {
  return RustModule.SigmaRust.Address.from_mainnet_str(address)
    .to_ergo_tree()
    .to_base16_bytes();
}

export function MakeSortButton<TColumn>(column: Column<TColumn>, text: string) {
  return (
    <Button
      className="font-bold text-foreground"
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {text}
      {column.getIsSorted() === false ? (
        <ArrowUpDown className="ml-2 h-4 w-4" />
      ) : column.getIsSorted() === "asc" ? (
        <ArrowUp className="ml-2 h-4 w-4" />
      ) : (
        <ArrowDown className="ml-2 h-4 w-4" />
      )}
    </Button>
  );
}

function asIndexedBox(box: ErgoTransactionOutput): IndexedErgoBox {
  return {
    ...box,
    address: MainNetAddressFromErgoTree(box.ergoTree),
    spentTransactionId: null,
    spendingHeight: null,
    inclusionHeight: 0,
    globalIndex: 0,
  };
}

export async function asIndexedTx(
  tx: ErgoTransaction,
): Promise<IndexedErgoTransaction> {
  return {
    id: tx.id as string,
    inputs: (
      await NETWORK.API()
        .utxo.getBoxWithPoolByIds(tx.inputs.map((i) => i.boxId))
        .then((resp) => resp.data)
    ).map(asIndexedBox),
    dataInputs: tx.dataInputs,
    outputs: tx.outputs.map(asIndexedBox),
    inclusionHeight: 0,
    numConfirmations: 0,
    blockId: "",
    timestamp: 0,
    index: 0,
    globalIndex: 0,
    size: tx.size as number,
  };
}

export interface NodeInfo {
  index: number;
  status: boolean;
  url: string;
  name: string;
  version: string;
  ping: number;
}

export async function GetNodeInfo(
  address: string,
  index: number,
): Promise<NodeInfo> {
  const api = new ErgoApi();
  api.baseUrl = address;
  const time1 = performance.now();
  const tmp = await api.info
    .getNodeInfo()
    .then((resp) => resp.data)
    .catch(() => undefined);
  const time2 = performance.now();
  return {
    index: index,
    status: tmp !== undefined,
    url: address,
    name: tmp ? tmp.name : "-",
    version: tmp ? tmp.appVersion : "-",
    ping: tmp ? time2 - time1 : Infinity,
  };
}
