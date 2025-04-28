import { Input } from "@/components/ui/input";

export interface SearchBarProps {
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
}

export default function SearchBar(props: SearchBarProps) {
  return (
    <div className="flex items-center py-4">
      <Input
        placeholder="Filter users..."
        value={props.globalFilter ?? ""}
        onChange={(event) => props.setGlobalFilter(event.target.value)}
        className="max-w-sm"
      />
    </div>
  );
}
