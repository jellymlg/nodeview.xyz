import { Block, BlockColumns } from "@/components/ui/block-columns";
import { DataTable } from "@/components/ui/data-table";

function getBlocks(): Block[] {
    return [
        {
            id: "string",
            height: 1,
            time: "string",
            txs: 2,
            size: 3
        },
        {
            id: "string",
            height: 1,
            time: "string",
            txs: 2,
            size: 3
        }
    ];
}

export default function blocks() {
    const blocks = getBlocks();
    return (
        <div>
            <DataTable columns={BlockColumns} data={blocks}></DataTable>
        </div>
    );
}