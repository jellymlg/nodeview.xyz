import { Block, BlockColumns } from "@/components/ui/block-columns";
import { DataTable } from "@/components/ui/data-table";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

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