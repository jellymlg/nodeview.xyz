import { Block, BlockColumns } from "@/components/type/block-columns";
import { DataTable } from "@/components/ui/data-table";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

function getBlocks(): Block[] {
    return [
        {
            id: "980b23929027b36596950327b4d8bc65c5cb5a7003e07b19ffa2c0cc24334b16",
            height: 1441381,
            time: "17.01.2025 16:52:48",
            txs: 15,
            size: 122.61
        },
        {
            id: "be7e01a953c9ee4441e448fce94bc6288f1ccd8e4b19c2d3e5d753dce6eb149b",
            height: 1441380,
            time: "17.01.2025 16:52:36",
            txs: 4,
            size: 13.16
        },
        {
            id: "980b23929027b36596950327b4d8bc65c5cb5a7003e07b19ffa2c0cc24334b16",
            height: 1441381,
            time: "17.01.2025 16:52:48",
            txs: 15,
            size: 122.61
        },
        {
            id: "be7e01a953c9ee4441e448fce94bc6288f1ccd8e4b19c2d3e5d753dce6eb149b",
            height: 1441380,
            time: "17.01.2025 16:52:36",
            txs: 4,
            size: 13.16
        },
        {
            id: "980b23929027b36596950327b4d8bc65c5cb5a7003e07b19ffa2c0cc24334b16",
            height: 1441381,
            time: "17.01.2025 16:52:48",
            txs: 15,
            size: 122.61
        },
        {
            id: "be7e01a953c9ee4441e448fce94bc6288f1ccd8e4b19c2d3e5d753dce6eb149b",
            height: 1441380,
            time: "17.01.2025 16:52:36",
            txs: 4,
            size: 13.16
        },
        {
            id: "980b23929027b36596950327b4d8bc65c5cb5a7003e07b19ffa2c0cc24334b16",
            height: 1441381,
            time: "17.01.2025 16:52:48",
            txs: 15,
            size: 122.61
        },
        {
            id: "be7e01a953c9ee4441e448fce94bc6288f1ccd8e4b19c2d3e5d753dce6eb149b",
            height: 1441380,
            time: "17.01.2025 16:52:36",
            txs: 4,
            size: 13.16
        },
        {
            id: "980b23929027b36596950327b4d8bc65c5cb5a7003e07b19ffa2c0cc24334b16",
            height: 1441381,
            time: "17.01.2025 16:52:48",
            txs: 15,
            size: 122.61
        },
        {
            id: "be7e01a953c9ee4441e448fce94bc6288f1ccd8e4b19c2d3e5d753dce6eb149b",
            height: 1441380,
            time: "17.01.2025 16:52:36",
            txs: 4,
            size: 13.16
        },
    ];
}

export default function blocks() {
    const blocks = getBlocks();
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