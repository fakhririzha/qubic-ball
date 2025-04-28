import { Button } from "@/components/ui/button";

export interface PaginationProps {
  previousPage: () => void;
  nextPage: () => void;
  canPreviousPage: boolean;
  canNextPage: boolean;
}

export default function Pagination(props: PaginationProps) {
  return (
    <div className="flex items-center justify-end space-x-2 py-4">
      <Button
        variant="outline"
        size="sm"
        onClick={() => props.previousPage()}
        disabled={!props.canPreviousPage}
      >
        Previous
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => props.nextPage()}
        disabled={!props.canNextPage}
      >
        Next
      </Button>
    </div>
  );
}
