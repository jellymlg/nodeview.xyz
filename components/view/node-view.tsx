import { useEffect, useRef, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { GetNodeInfo, NodeInfo } from "@/lib/utils";
import { NETWORK } from "@/lib/network";
import { Separator } from "../ui/separator";

export function NodeView() {
  const [loading, setLoading] = useState<boolean>(true);
  const [info, setInfo] = useState<NodeInfo>();
  const lastUpdate = useRef<number>(0);
  useEffect(() => {
    const fun = async () => {
      if (lastUpdate.current != NETWORK.update) {
        lastUpdate.current = NETWORK.update;
        setLoading(true);
        setInfo(await GetNodeInfo(NETWORK.getConnected(), 0));
        setLoading(false);
      }
    };
    const int = setInterval(fun, 1000);
    return () => clearInterval(int);
  });
  return (
    <div className="flex flex-1 rounded-xl border mt-4 p-6 justify-between text-lg">
      <div className="flex flex-col justify-between w-[49%]">
        <div className="flex">
          <p className="w-1/4 flex content-center">Status:</p>
          {loading ? (
            <Skeleton className="w-3/4 h-[20px]" />
          ) : (
            <p className="w-3/4 flex content-center">
              {info?.status ? "Connected" : "Error"}
            </p>
          )}
        </div>
        <div className="flex">
          <p className="w-1/4 flex content-center">Address:</p>
          {loading ? (
            <Skeleton className="w-3/4 h-[20px]" />
          ) : (
            <p className="w-3/4 flex content-center">{info?.url}</p>
          )}
        </div>
        <div className="flex">
          <p className="w-1/4 flex content-center">Name:</p>
          {loading ? (
            <Skeleton className="w-3/4 h-[20px]" />
          ) : (
            <p className="w-3/4 flex content-center">{info?.name}</p>
          )}
        </div>
      </div>
      <Separator orientation="vertical" className="flex h-auto" />
      <div className="flex flex-col justify-between w-[49%]">
        <div className="flex">
          <p className="w-1/4 flex content-center">Version:</p>
          {loading ? (
            <Skeleton className="w-3/4 h-[20px]" />
          ) : (
            <p className="w-3/4 flex content-center">{info?.version}</p>
          )}
        </div>
        <div className="flex">
          <p className="w-1/4 flex content-center">Block height:</p>
          {loading ? (
            <Skeleton className="w-3/4 h-[20px]" />
          ) : (
            <p className="w-3/4 flex content-center">{info?.height}</p>
          )}
        </div>
        <div className="flex">
          <p className="w-1/4 flex content-center">Latency:</p>
          {loading ? (
            <Skeleton className="w-3/4 h-[20px]" />
          ) : (
            <p className="w-3/4 flex content-center">
              {info?.ping.toFixed()} ms
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
