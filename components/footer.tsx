import { ModeToggle } from "./ui/mode-toggle";
import { NodeChangeDialog } from "./node-change-dialog";

export function Footer() {
  return (
    <footer className="flex min-w-max min-h-max border rounded-lg relative clear-both mt-4 p-4">
      <div className="mr-4">
        <ModeToggle />
      </div>
      <NodeChangeDialog />
    </footer>
  );
}
