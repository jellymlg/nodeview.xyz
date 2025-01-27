import { DataTable } from "@/components/ui/data-table";
import { ErgoApi, ErgoTransaction, Transactions } from "../lib/ergo-api";
import { Column, ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import Link from "next/link";
import { feeFromTx } from "@/lib/utils";

function SortButton<TColumn>(column: Column<TColumn>, text: string) {
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

export const TxColumns: ColumnDef<ErgoTransaction>[] = [
  {
    accessorKey: "id",
    header: "Transaction Hash",
    cell: ({ row }) => {
      return (
        <Link
          className="text-primary hover:underline"
          href={"tx?id=" + row.original.id}
        >
          {row.original.id}
        </Link>
      );
    },
  },
  {
    accessorKey: "inputs",
    header: ({ column }) => SortButton(column, "Inputs"),
    cell: ({ row }) => {
      return row.original.inputs.length;
    },
  },
  {
    accessorKey: "outputs",
    header: ({ column }) => SortButton(column, "Outputs"),
    cell: ({ row }) => {
      return row.original.outputs.length;
    },
  },
  {
    accessorKey: "size",
    header: ({ column }) => SortButton(column, "Size"),
    cell: ({ row }) => {
      return (row.original.size as number) / 1000 + " kB";
    },
    sortingFn: (rowA, rowB) => {
      const a = rowA.original.size as number;
      const b = rowB.original.size as number;
      return a > b ? 1 : a < b ? -1 : 0;
    },
  },
  {
    id: "fee",
    accessorFn: feeFromTx,
    header: ({ column }) => SortButton(column, "Fee"),
    cell: ({ row }) => {
      return feeFromTx(row.original) / 1_000_000_000 + " ERG";
    },
    sortingFn: (rowA, rowB) => {
      const a = feeFromTx(rowA.original),
        b = feeFromTx(rowB.original);
      return a > b ? 1 : a < b ? -1 : 0;
    },
  },
  {
    id: "feePerByte",
    header: ({ column }) => SortButton(column, "Fee Per Byte"),
    accessorFn: (row) => {
      return feeFromTx(row) / (row.size as number);
    },
    cell: ({ row }) => {
      return (
        (
          feeFromTx(row.original) /
          (row.original.size as number) /
          1_000_000_000
        ).toFixed(9) + " ERG"
      );
    },
    sortingFn: (rowA, rowB) => {
      const a = feeFromTx(rowA.original) / (rowA.original.size as number),
        b = feeFromTx(rowB.original) / (rowB.original.size as number);
      return a > b ? 1 : a < b ? -1 : 0;
    },
  },
];

export default function Mempool() {
  const [txs, setTxs] = useState<Transactions>([]);
  useEffect(() => {
    const api = new ErgoApi();
    api.baseUrl = "http://213.239.193.208:9053";
    const fun = async () => {
      api.transactions
        .getUnconfirmedTransactions({ limit: 200 })
        .then((resp) => setTxs(resp.data));
    };
    fun();
    const interval = setInterval(fun, 5000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="flex flex-wrap justify-center">
      <DataTable columns={TxColumns} data={txs}></DataTable>
    </div>
  );
}
