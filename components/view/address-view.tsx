import { BalanceResponse, TxsResponse } from "@/pages/address";
import { Separator } from "../ui/separator";
import { DataTable } from "../data-table";
import { IndexedErgoTransaction } from "@/lib/ergo-api";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { TxType } from "../widget/tx-type";
import { TxStatus } from "../widget/tx-status";
import { feeFromTx } from "@/lib/utils";
import { TokenInfo, TokenPopover } from "../widget/token-popover";
import { Skeleton } from "../ui/skeleton";
import { AddressType } from "../widget/address-type";

interface AddressViewProps {
  address: string;
  txs: TxsResponse | undefined;
  balance: BalanceResponse;
  loading: boolean;
}

export const IndexedTxColumns: ColumnDef<IndexedErgoTransaction>[] = [
  {
    accessorKey: "timestamp",
    header: "Timestamp",
    cell: ({ row }) => {
      return row.original.timestamp > 0
        ? new Date(row.original.timestamp).toLocaleString()
        : "-";
    },
  },
  {
    accessorKey: "inclusionHeight",
    header: "Block",
    cell: ({ row }) => {
      return row.original.timestamp > 0 ? (
        <Link
          className="text-primary hover:underline"
          href={"../block?id=" + row.original.blockId}
        >
          {row.original.inclusionHeight}
        </Link>
      ) : (
        "-"
      );
    },
  },
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
    id: "status",
    header: "Status",
    cell: ({ row }) => {
      return (
        <div className="flex justify-center">
          <TxStatus confirmed={row.original.timestamp > 0} />
        </div>
      );
    },
  },
  {
    id: "type",
    header: "Type",
    cell: ({ row }) => {
      return (
        <div className="flex justify-center">
          <TxType inputs={row.original.inputs} outputs={row.original.outputs} />
        </div>
      );
    },
  },
  {
    id: "fee",
    header: "Fee",
    cell: ({ row }) => {
      return feeFromTx(row.original) / 1_000_000_000 + " ERG";
    },
  },
];

export function AddressView({
  address,
  txs,
  balance,
  loading,
}: AddressViewProps) {
  return (
    <div>
      <div className="flex flex-wrap justify-center mx-auto rounded-lg border m-4 w-3/4 p-6 text-lg">
        <div className="flex flex-wrap w-full">
          <div className="w-1/4 flex content-center flex-wrap">Address:</div>
          {loading ? (
            <Skeleton className="w-3/4" />
          ) : (
            <div className="w-3/4 truncate">{address}</div>
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
            <div className="w-3/4 truncate">{txs?.total}</div>
          )}
        </div>
        <Separator className="m-3" />
        <div className="flex flex-wrap w-full">
          <div className="w-1/4 flex content-center flex-wrap">
            Confirmed balance:
          </div>
          {loading ? (
            <Skeleton className="w-3/4" />
          ) : (
            <div className="w-3/4 truncate">
              {(balance.confirmed?.nanoErgs as number) / 1_000_000_000 + " ERG"}
              {(balance.confirmed?.tokens.length as number) > 0 ? (
                <TokenPopover
                  tokens={
                    balance.confirmed?.tokens.map(
                      (x) => x as TokenInfo,
                    ) as TokenInfo[]
                  }
                  text={"+" + balance.confirmed?.tokens.length + " tokens"}
                />
              ) : (
                ""
              )}
            </div>
          )}
        </div>
        <Separator className="m-3" />
        <div className="flex flex-wrap w-full">
          <div className="w-1/4 flex content-center flex-wrap">
            Unonfirmed balance:
          </div>
          {loading ? (
            <Skeleton className="w-3/4" />
          ) : (
            <div className="w-3/4 truncate">
              {(balance.unconfirmed?.nanoErgs as number) / 1_000_000_000 +
                " ERG"}
              {(balance.unconfirmed?.tokens.length as number) > 0 ? (
                <TokenPopover
                  tokens={
                    balance.unconfirmed?.tokens.map(
                      (x) => x as TokenInfo,
                    ) as TokenInfo[]
                  }
                  text={"+" + balance.unconfirmed?.tokens.length + " tokens"}
                />
              ) : (
                ""
              )}
            </div>
          )}
        </div>
        <Separator className="m-3" />
        <div className="flex flex-wrap w-full">
          <div className="w-1/4 flex content-center flex-wrap">
            Address type:
          </div>
          {loading ? (
            <Skeleton className="w-3/4" />
          ) : (
            <div className="w-3/4 truncate">
              <AddressType address={address} />
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-wrap justify-center w-3/4 mx-auto my-4">
        <DataTable
          columns={IndexedTxColumns}
          data={loading ? [] : (txs?.items as IndexedErgoTransaction[])}
        />
      </div>
    </div>
  );
}
