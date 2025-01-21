import { ErgoApi, IndexedErgoTransaction } from "@/lib/ergo-api";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Address() {
  const addr: string = useSearchParams().get("id") as string;
  const [address, setAddress] = useState<
    | {
        items?: IndexedErgoTransaction[];
        total?: number;
      }
    | undefined
  >();
  useEffect(() => {
    if (!addr) return;
    const api = new ErgoApi();
    api.baseUrl = "http://213.239.193.208:9053";
    const fun = async () => {
      api.blockchain
        .getTxsByAddress(addr, { offset: 0, limit: 30 })
        .then((resp) => setAddress(resp.data));
    };
    fun();
  }, [addr]);
  if (!address) {
    return <p>Not found address {addr}</p>;
  } else {
    return (
      <div>
        <p>Found address {addr}</p>
      </div>
    );
  }
}
