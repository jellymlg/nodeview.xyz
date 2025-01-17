import { ColumnDef } from "@tanstack/react-table"

export type Block = {
  id: string
  height: number
  time: string
  txs: number
  size: number
}

export const BlockColumns: ColumnDef<Block>[] = [
  {
    accessorKey: "height",
    header: "Height"
  },
  {
    accessorKey: "time",
    header: "Timestamp"
  },
  {
    accessorKey: "txs",
    header: "Transactions"
  },
  {
    accessorKey: "size",
    header: "Size"
  }
]
