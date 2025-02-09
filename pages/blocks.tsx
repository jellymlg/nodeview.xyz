import { DataTable } from "@/components/data-table";
import { DynamicPagination } from "@/components/dynamic-pagination";
import { FullBlock } from "@/lib/ergo-api";
import { NETWORK } from "@/lib/network";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const BlockColumns: ColumnDef<FullBlock>[] = [
  {
    accessorFn: (row) => {
      return row.header.height;
    },
    header: "Height",
  },
  {
    accessorFn: (row) => {
      return row.header.id;
    },
    header: "Hash",
    cell: ({ row }) => {
      return (
        <Link
          className="text-primary hover:underline"
          href={"../block?id=" + row.original.header.id}
        >
          {row.original.header.id}
        </Link>
      );
    },
  },
  {
    accessorFn: (row) => {
      return row.header.timestamp;
    },
    header: "Timestamp",
    cell: ({ row }) => {
      return new Date(row.original.header.timestamp).toLocaleString();
    },
  },
  {
    accessorFn: (row) => {
      return row.blockTransactions.transactions.length;
    },
    header: "Transactions",
  },
  {
    accessorFn: (row) => {
      return row.header.difficulty;
    },
    header: "Difficulty",
  },
  {
    accessorKey: "size",
    header: "Size",
    cell: ({ row }) => {
      return row.original.size / 1000 + " kB";
    },
  },
];

export default function Blocks() {
  document.title = "NodeView | Blocks";
  const num: number = parseInt(useSearchParams().get("page") as string);
  const [blocks, setBlocks] = useState<FullBlock[]>([]);
  useEffect(() => {
    if (!num) return;
    const fun = async () => {
      setBlocks([]);
      NETWORK.API()
        .blockchain.getIndexedHeight()
        .then((resp) => {
          const off = Math.max(
            0,
            (resp.data.fullHeight as number) - 30 * (num - 1) - 29,
          );
          NETWORK.API()
            .blocks.getHeaderIds({
              offset: off,
              limit: 30,
            })
            .then((resp) => {
              NETWORK.API()
                .blocks.getFullBlockByIds(resp.data.reverse())
                .then((resp) => setBlocks(resp.data))
                .catch(() => fun());
            })
            .catch(() => fun());
        })
        .catch(() => fun());
    };
    fun();
  }, [num]);
  return (
    <div>
      <div className="flex flex-wrap justify-center w-3/4 mx-auto my-4">
        <DataTable columns={BlockColumns} data={blocks}></DataTable>
      </div>
      {blocks.length > 0 && (
        <DynamicPagination
          current={num}
          lastElemNum={blocks[blocks.length - 1].header.height}
          urlBase="/blocks?page="
        />
      )}
    </div>
  );
}
