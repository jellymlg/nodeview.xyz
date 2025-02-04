import { useEffect, useRef, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { GetNodeInfo, NodeInfo } from "@/lib/utils";
import { NETWORK } from "@/lib/network";

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
    <div className="flex flex-1 flex-col rounded-xl border mt-4">
      {loading ? <Skeleton /> : <p>{info?.url}</p>}
      {loading ? <Skeleton /> : <p>{info?.name}</p>}
    </div>
  );
}
