import { ModeToggle } from "./ui/mode-toggle";
import { NodeChangeDialog } from "./node-change-dialog";
import { GithubIcon } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="flex items-center justify-between min-w-max min-h-max border rounded-lg relative clear-both mt-4 p-4">
      <ModeToggle />
      <Link
        href="https://github.com/jellymlg/nodeview.xyz"
        target="_blank"
      >
        <GithubIcon />
      </Link>
      <NodeChangeDialog />
    </footer>
  );
}
