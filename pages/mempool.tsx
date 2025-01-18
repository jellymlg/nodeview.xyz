import { DataTable } from "@/components/ui/data-table";
import { ErgoApi, ErgoTransaction, ErgoTransactionInput, ErgoTransactionOutput, Transactions } from "../lib/ergo-api";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import Link from "next/link";

const feeTree: string = "1005040004000e36100204a00b08cd0279be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798ea02d192a39a8cc7a701730073011001020402d19683030193a38cc7b2a57300000193c2b2a57301007473027303830108cdeeac93b1a57304";

export const TxColumns: ColumnDef<ErgoTransaction>[] = [
    {
        accessorKey: "id",
        header: "Transaction Hash",
        cell: ({row}) => {
            return (
                <Link className="text-primary underline" href={"https://explorer.ergoplatform.com/en/transactions/" + row.getValue<string>("id")} target="_blank">
                    {row.getValue<string>("id")}
                </Link>
            )
        }
    },
    {
        accessorKey: "inputs",
        header: "Inputs",
        cell: ({row}) => {
            return row.getValue<ErgoTransactionInput[]>("inputs").length
        }
    },
    {
        accessorKey: "outputs",
        header: "Outputs",
        cell: ({row}) => {
            return row.getValue<ErgoTransactionOutput[]>("outputs").length
        }
    },
    {
        accessorKey: "size",
        header: ({column}) => {
            return (
                <Button className="font-bold text-foreground" variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Size
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({row}) => {
            return row.getValue<number>("size") / 1000 + " kB"
        },
        sortingFn: (rowA, rowB) => {
            const a = rowA.getValue<number>("size")
            const b = rowB.getValue<number>("size")
            return a > b ? 1 : a < b ? -1 : 0
        }
    },
    {
        id: "fee",
        accessorFn: (row) => {
            return (row.outputs.find(b => b.ergoTree == feeTree) as ErgoTransactionOutput).value
        },
        header: ({column}) => {
            return (
                <Button className="font-bold text-foreground" variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Fee
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({row}) => {
            const feeBox = row.original.outputs.find(b => b.ergoTree == feeTree) as ErgoTransactionOutput;
            return feeBox.value / 1_000_000_000 + " ERG"
        },
        sortingFn: (rowA, rowB) => {
            const feeBoxA = rowA.original.outputs.find(b => b.ergoTree == feeTree) as ErgoTransactionOutput;
            const feeBoxB = rowB.original.outputs.find(b => b.ergoTree == feeTree) as ErgoTransactionOutput;
            const a = feeBoxA.value, b = feeBoxB.value
            return a > b ? 1 : a < b ? -1 : 0
        }
    }
];

export default function Mempool() {
    const [txs, setTxs] = useState<Transactions>([]);
    useEffect(() => {
        const api = new ErgoApi();
        api.baseUrl = "http://213.239.193.208:9053";
        const fun = async () => {
            api.transactions.getUnconfirmedTransactions({limit: 200}).then(resp => setTxs(resp.data));
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