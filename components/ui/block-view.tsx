import {
  ErgoTransaction,
  ErgoTransactionOutput,
  FullBlock,
} from "@/lib/ergo-api";
import { Separator } from "./separator";
import { DataTable } from "./data-table";
import { TxColumns } from "@/pages/mempool";
import { MainNetAddressFromErgoTree } from "@/lib/utils";
import Link from "next/link";

interface BlockViewProps {
  block: FullBlock;
}

export function BlockView({ block }: BlockViewProps) {
  const miner = MainNetAddressFromErgoTree(
    (
      (
        block.blockTransactions.transactions.at(-1) as ErgoTransaction
      ).outputs.at(-1) as ErgoTransactionOutput
    ).ergoTree,
  );
  return (
    <div>
      <div className="flex flex-wrap justify-center mx-auto rounded-lg border m-4 w-3/4 p-6 text-lg bg-black bg-opacity-70">
        <div className="flex flex-wrap w-full">
          <div className="w-1/4 flex content-center flex-wrap">Block id:</div>
          <div className="w-3/4 truncate">{block.header.id}</div>
        </div>
        <Separator className="m-3" />
        <div className="flex flex-wrap w-full">
          <div className="w-1/4 flex content-center flex-wrap">Height:</div>
          <div className="w-3/4 truncate">{block.header.height}</div>
        </div>
        <Separator className="m-3" />
        <div className="flex flex-wrap w-full">
          <div className="w-1/4 flex content-center flex-wrap">Timestamp:</div>
          <div className="w-3/4 truncate">
            {new Date(block.header.timestamp).toLocaleString()}
          </div>
        </div>
        <Separator className="m-3" />
        <div className="flex flex-wrap w-full">
          <div className="w-1/4 flex content-center flex-wrap">
            Number of transactions:
          </div>
          <div className="w-3/4 truncate">
            {block.blockTransactions.transactions.length}
          </div>
        </div>
        <Separator className="m-3" />
        <div className="flex flex-wrap w-full">
          <div className="w-1/4 flex content-center flex-wrap">Size:</div>
          <div className="w-3/4 truncate">{block.size / 1000 + " kB"}</div>
        </div>
        <Separator className="m-3" />
        <div className="flex flex-wrap w-full">
          <div className="w-1/4 flex content-center flex-wrap">Difficulty:</div>
          <div className="w-3/4 truncate">{block.header.difficulty}</div>
        </div>
        <Separator className="m-3" />
        <div className="flex flex-wrap w-full">
          <div className="w-1/4 flex content-center flex-wrap">Mined by:</div>
          <div className="w-3/4 truncate">
            <Link
              className="text-primary hover:underline"
              href={"../address?id=" + miner}
            >
              {miner}
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-center">
        <DataTable
          columns={TxColumns}
          data={block.blockTransactions.transactions}
        />
      </div>
    </div>
  );
}
