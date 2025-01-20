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
import { useRouter } from "next/router";
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
          href={"../block/" + row.original.header.id}
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
  const pageNum: number = parseInt(useRouter().query.page as string);
  const [blocks, setBlocks] = useState<FullBlock[]>([]);
  useEffect(() => {
    if(!pageNum) return;
    const api = new ErgoApi();
    api.baseUrl = "http://213.239.193.208:9053";
    const fun = async () => {
      api.blockchain.getIndexedHeight().then((resp) => {
        const off = Math.max(0, (resp.data.fullHeight as number) - (30 * (pageNum - 1)) - 29)
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
  }, [pageNum]);
  return (
    <div className="flex flex-wrap justify-center">
      <DataTable columns={BlockColumns} data={blocks}></DataTable>
      {
        blocks.length > 0 && (
          <Pagination>
            <PaginationContent>
              {
                (pageNum > 1) && (
                  <div className="flex">
                    <PaginationItem>
                      <PaginationPrevious href={"/blocks/" + (pageNum - 1)}/>
                    </PaginationItem>
                    {
                      (pageNum > 2) && (
                        <PaginationItem>
                          <PaginationEllipsis />
                        </PaginationItem>
                      )
                    }
                    <PaginationItem>
                      <PaginationLink href={"/blocks/" + (pageNum - 1)}>{pageNum - 1}</PaginationLink>
                    </PaginationItem>
                  </div>
                )
              }
              <PaginationItem>
                <PaginationLink href={"/blocks/" + pageNum} isActive>{pageNum}</PaginationLink>
              </PaginationItem>
              {
                (blocks[blocks.length - 1].header.height > 1) && (
                  <div className="flex">
                    <PaginationItem>
                      <PaginationLink href={"/blocks/" + (pageNum + 1)}>{pageNum + 1}</PaginationLink>
                    </PaginationItem>
                    {
                      (blocks[blocks.length - 1].header.height >= 30) && (
                        <PaginationItem>
                          <PaginationEllipsis />
                        </PaginationItem>
                      )
                    }
                    <PaginationItem>
                      <PaginationNext href={"/blocks/" + (pageNum + 1)} />
                    </PaginationItem>
                  </div>
                )
              }
            </PaginationContent>
          </Pagination>
        )
      }

    </div>
  );
}
