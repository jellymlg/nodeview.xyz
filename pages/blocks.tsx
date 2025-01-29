import { DataTable } from "@/components/ui/data-table";
import { DynamicPagination } from "@/components/ui/dynamic-pagination";
import { ErgoApi, FullBlock } from "@/lib/ergo-api";
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
          className="text-primary underline"
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
  document.title = "ErgoSpace | Blocks";
  const num: number = parseInt(useSearchParams().get("page") as string);
  const [blocks, setBlocks] = useState<FullBlock[]>([]);
  useEffect(() => {
    if (!num) return;
    const api = new ErgoApi();
    api.baseUrl = "http://213.239.193.208:9053";
    const fun = async () => {
      api.blockchain.getIndexedHeight().then((resp) => {
        const off = Math.max(
          0,
          (resp.data.fullHeight as number) - 30 * (num - 1) - 29,
        );
        api.blocks
          .getHeaderIds({
            offset: off,
            limit: 30,
          })
          .then((resp) => {
            api.blocks
              .getFullBlockByIds(resp.data.reverse())
              .then((resp) => setBlocks(resp.data));
          });
      });
    };
    fun();
    const interval = setInterval(fun, 30000);
    return () => clearInterval(interval);
  }, [num]);
  return (
    <div className="flex flex-wrap justify-center">
      <DataTable columns={BlockColumns} data={blocks}></DataTable>
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
