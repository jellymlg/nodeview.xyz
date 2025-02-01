import {
  ErgoTransaction,
  ErgoTransactionOutput,
  FullBlock,
} from "@/lib/ergo-api";
import { Separator } from "../ui/separator";
import { DataTable } from "../data-table";
import { TxColumns } from "@/pages/mempool";
import { MainNetAddressFromErgoTree } from "@/lib/utils";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";

interface BlockViewProps {
  block: FullBlock;
  loading: boolean;
}

export function BlockView({ block, loading }: BlockViewProps) {
  const miner = loading
    ? ""
    : MainNetAddressFromErgoTree(
        (
          (
            block.blockTransactions.transactions.at(-1) as ErgoTransaction
          ).outputs.at(-1) as ErgoTransactionOutput
        ).ergoTree,
      );
  return (
    <div>
      <div className="flex flex-wrap justify-center mx-auto rounded-lg border m-4 w-3/4 p-6 text-lg">
        <div className="flex flex-wrap w-full">
          <div className="w-1/4 flex content-center flex-wrap">Block id:</div>
          {loading ? (
            <Skeleton className="w-3/4" />
          ) : (
            <div className="w-3/4 truncate">{block.header.id}</div>
          )}
        </div>
        <Separator className="m-3" />
        <div className="flex flex-wrap w-full">
          <div className="w-1/4 flex content-center flex-wrap">Height:</div>
          {loading ? (
            <Skeleton className="w-3/4" />
          ) : (
            <div className="w-3/4 truncate">{block.header.height}</div>
          )}
        </div>
        <Separator className="m-3" />
        <div className="flex flex-wrap w-full">
          <div className="w-1/4 flex content-center flex-wrap">Timestamp:</div>
          {loading ? (
            <Skeleton className="w-3/4" />
          ) : (
            <div className="w-3/4 truncate">
              {new Date(block.header.timestamp).toLocaleString()}
            </div>
          )}
        </div>
        <Separator className="m-3" />
        <div className="flex flex-wrap w-full">
          <div className="w-1/4 flex content-center flex-wrap">
            Number of transactions:
          </div>
          {loading ? (
            <Skeleton className="w-3/4" />
          ) : (
            <div className="w-3/4 truncate">
              {block.blockTransactions.transactions.length}
            </div>
          )}
        </div>
        <Separator className="m-3" />
        <div className="flex flex-wrap w-full">
          <div className="w-1/4 flex content-center flex-wrap">Size:</div>
          {loading ? (
            <Skeleton className="w-3/4" />
          ) : (
            <div className="w-3/4 truncate">{block.size / 1000 + " kB"}</div>
          )}
        </div>
        <Separator className="m-3" />
        <div className="flex flex-wrap w-full">
          <div className="w-1/4 flex content-center flex-wrap">Difficulty:</div>
          {loading ? (
            <Skeleton className="w-3/4" />
          ) : (
            <div className="w-3/4 truncate">{block.header.difficulty}</div>
          )}
        </div>
        <Separator className="m-3" />
        <div className="flex flex-wrap w-full">
          <div className="w-1/4 flex content-center flex-wrap">Mined by:</div>
          {loading ? (
            <Skeleton className="w-3/4" />
          ) : (
            <div className="w-3/4 truncate">
              <Link
                className="text-primary hover:underline"
                href={"../address?id=" + miner}
              >
                {miner}
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-wrap justify-center w-3/4 mx-auto">
        <DataTable
          columns={TxColumns}
          data={loading ? [] : block.blockTransactions.transactions}
        />
      </div>
    </div>
  );
}
