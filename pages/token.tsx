import { ErgoApi, IndexedToken } from "@/lib/ergo-api";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Token() {
  const id: string = useSearchParams().get("id") as string;
  const [token, setToken] = useState<IndexedToken | undefined>();
  useEffect(() => {
    if (!id || id.length != 64) return;
    const api = new ErgoApi();
    api.baseUrl = "http://213.239.193.208:9053";
    const fun = async () => {
      api.blockchain.getTokenById(id).then((resp) => setToken(resp.data));
    };
    fun();
  }, [id]);
  if (!token) {
    return <p>Not found token with id {id}</p>;
  } else {
    return (
      <div>
        <p>Found token with id {id}</p>
      </div>
    );
  }
}
