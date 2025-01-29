import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationEllipsis,
  PaginationLink,
  PaginationNext,
} from "./ui/pagination";

interface DynamicPaginationProps {
  current: number;
  lastElemNum: number;
  urlBase: string;
}

export function DynamicPagination({
  current,
  lastElemNum,
  urlBase,
}: DynamicPaginationProps) {
  return (
    <Pagination>
      <PaginationContent>
        {current > 1 && (
          <div className="flex">
            <PaginationItem>
              <PaginationPrevious href={urlBase + (current - 1)} />
            </PaginationItem>
            {current > 2 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationLink href={urlBase + (current - 1)}>
                {current - 1}
              </PaginationLink>
            </PaginationItem>
          </div>
        )}
        <PaginationItem>
          <PaginationLink href={urlBase + current} isActive>
            {current}
          </PaginationLink>
        </PaginationItem>
        {lastElemNum > 1 && (
          <div className="flex">
            <PaginationItem>
              <PaginationLink href={urlBase + (current + 1)}>
                {current + 1}
              </PaginationLink>
            </PaginationItem>
            {lastElemNum >= 30 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationNext href={urlBase + (current + 1)} />
            </PaginationItem>
          </div>
        )}
      </PaginationContent>
    </Pagination>
  );
}
