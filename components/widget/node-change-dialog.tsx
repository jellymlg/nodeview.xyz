import { NETWORK } from "@/lib/network";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { useState } from "react";

export function NodeChangeDialog() {
  const [newUrl, setNewUrl] = useState<string>("");
  const nodes = NETWORK.getNodes();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setNewUrl("")}>
          Change node
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change node</DialogTitle>
          <DialogDescription>Number of nodes: {nodes.length}</DialogDescription>
        </DialogHeader>
        <div>
          {nodes.map((url) => (
            <p key={url}>{url}</p>
          ))}
          <Input onChange={(e) => setNewUrl(e.target.value)} />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={() => NETWORK.addNode(localStorage, newUrl)}>
              Save changes
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
