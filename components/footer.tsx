import { ModeToggle } from "./ui/mode-toggle";
import { NodeChangeDialog } from "./widget/node-change-dialog";

export function Footer() {
  return (
    <footer className="min-w-max h-[300px] border rounded-lg relative clear-both mt-4">
      <ModeToggle />
      <NodeChangeDialog />
    </footer>
  );
}
