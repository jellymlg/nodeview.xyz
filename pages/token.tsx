import { TokenView } from "@/components/view/token-view";
import { ErgoApi, IndexedToken } from "@/lib/ergo-api";
import { notFound, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Token() {
  const id: string = useSearchParams().get("id") as string;
  const [token, setToken] = useState<IndexedToken>();
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    document.title = "ErgoSpace | Token";
    if (!id || id.length != 64) return;
    const api = new ErgoApi();
    api.baseUrl = "http://213.239.193.208:9053";
    const fun = async () => {
      api.blockchain.getTokenById(id).then((resp) => {
        setToken(resp.data);
        setLoading(false);
      });
    };
    fun();
  }, [id]);
  if (!token && !loading) {
    return notFound();
  } else {
    return <TokenView token={token as IndexedToken} loading={loading} />;
  }
}
