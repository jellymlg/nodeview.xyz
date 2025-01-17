import { DataTable } from "@/components/ui/data-table";
import { ErgoApi, ErgoTransaction } from "../lib/ergo-api";
import { ColumnDef } from "@tanstack/react-table";

export const TxColumns: ColumnDef<ErgoTransaction>[] = [
    // TODO
];

export default function mempool() {
    const txs: Array<ErgoTransaction> = [];
    const api = new ErgoApi();
    api.baseUrl = "";
    api.transactions.getUnconfirmedTransactions({limit: 200}).then(resp => resp.data);
    return (
        <div>
            <DataTable columns={TxColumns} data={txs}></DataTable>
        </div>
    );
}