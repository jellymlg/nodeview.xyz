import { DataTable } from "@/components/data-table";
import { ErgoTransaction, Transactions } from "../lib/ergo-api";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import Link from "next/link";
import { feeFromTx, MakeSortButton } from "@/lib/utils";
import { NETWORK } from "@/lib/network";

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
    header: ({ column }) => MakeSortButton(column, "Inputs"),
    cell: ({ row }) => {
      return row.original.inputs.length;
    },
  },
  {
    accessorKey: "outputs",
    header: ({ column }) => MakeSortButton(column, "Outputs"),
    cell: ({ row }) => {
      return row.original.outputs.length;
    },
  },
  {
    accessorKey: "size",
    header: ({ column }) => MakeSortButton(column, "Size"),
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
    header: ({ column }) => MakeSortButton(column, "Fee"),
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
    header: ({ column }) => MakeSortButton(column, "Fee Per Byte"),
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
    document.title = "NodeView | Mempool";
    const fun = async () => {
      NETWORK.API()
        .transactions.getUnconfirmedTransactions({ limit: 200 })
        .then((resp) => setTxs(resp.data));
    };
    fun();
    const interval = setInterval(fun, 5000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="flex flex-wrap justify-center w-3/4 mx-auto my-4">
      <DataTable columns={TxColumns} data={txs}></DataTable>
    </div>
  );
}
