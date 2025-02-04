import { NETWORK } from "@/lib/network";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import { DataTable } from "./data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Check, X } from "lucide-react";
import { GetNodeInfo, MakeSortButton, NodeInfo } from "@/lib/utils";
import React from "react";
import { Checkbox } from "./ui/checkbox";

const NodeColumns: ColumnDef<NodeInfo>[] = [
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return row.original.status ? (
        <Check className="text-green-500" />
      ) : (
        <X className="text-red-600" />
      );
    },
  },
  {
    id: "selected",
    enableHiding: false,
    enableSorting: false,
    cell: ({ row, table }) => {
      return (
        <Checkbox
          checked={row.original.url == NETWORK.API().baseUrl}
          disabled={!row.original.status}
          onCheckedChange={(value) => {
            if (value) {
              NETWORK.setNode(localStorage, row.index);
              table.setRowSelection({});
            }
          }}
        />
      );
    },
  },
  {
    accessorKey: "url",
    header: "Address",
  },
  {
    accessorKey: "name",
    header: ({ column }) => MakeSortButton(column, "Name"),
  },
  {
    accessorKey: "version",
    header: ({ column }) => MakeSortButton(column, "Version"),
  },
  {
    accessorKey: "ping",
    header: ({ column }) => MakeSortButton(column, "Latency"),
    cell: ({ row }) => {
      return row.original.status ? row.original.ping.toFixed() + " ms" : "-";
    },
  },
];

export function NodeChangeDialog() {
  const [newUrl, setNewUrl] = useState<string>("");
  const [nodes, setNodes] = useState<string[]>([]);
  const [infos, setInfos] = useState<NodeInfo[]>([]);
  useEffect(() => {
    const fun = async () => {
      setInfos(
        await Promise.all(nodes.map(async (addr, i) => GetNodeInfo(addr, i))),
      );
    };
    if (nodes.length > 0) fun();
  }, [nodes]);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setNodes(NETWORK.getNodes())}>
          Change node
        </Button>
      </DialogTrigger>
      <DialogContent className="w-3/5 max-h-[75%] flex flex-col">
        <DialogHeader>
          <DialogTitle>Change node</DialogTitle>
          <DialogDescription>Number of nodes: {nodes.length}</DialogDescription>
        </DialogHeader>
        <div className="h-3/5 overflow-auto">
          <DataTable columns={NodeColumns} data={infos} />
        </div>
        <DialogFooter>
          <Input
            placeholder="Node URL"
            onChange={(e) => setNewUrl(e.target.value)}
          />
          <Button
            onClick={() => {
              if (newUrl.length == 0) return;
              NETWORK.addNode(localStorage, newUrl);
              setNodes(NETWORK.getNodes());
            }}
          >
            Add new node
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
