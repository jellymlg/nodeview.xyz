import { DataTable } from "@/components/ui/data-table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ErgoApi, FullBlock } from "@/lib/ergo-api";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
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
          href={"block/" + row.original.header.id}
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
  const [blocks, setBlocks] = useState<FullBlock[]>([]);
  useEffect(() => {
    const api = new ErgoApi();
    api.baseUrl = "http://213.239.193.208:9053";
    const fun = async () => {
      api.blockchain.getIndexedHeight().then((resp) => {
        api.blocks
          .getHeaderIds({
            offset: (resp.data.fullHeight as number) - 29,
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
  }, []);
  return (
    <div className="flex flex-wrap justify-center">
      <DataTable columns={BlockColumns} data={blocks}></DataTable>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
