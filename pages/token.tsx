import { TokenView } from "@/components/view/token-view";
import { IndexedToken } from "@/lib/ergo-api";
import { NETWORK } from "@/lib/network";
import { notFound, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Token() {
  const id: string = useSearchParams().get("id") as string;
  const [token, setToken] = useState<IndexedToken>();
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    document.title = "ErgoSpace | Token";
    if (!id || id.length != 64) return;
    const fun = async () => {
      NETWORK.API()
        .blockchain.getTokenById(id)
        .then((resp) => {
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
