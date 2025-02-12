import { TokenView } from "@/components/view/token-view";
import { IndexedToken } from "@/lib/ergo-api";
import { NETWORK } from "@/lib/network";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Custom404 from "./404";

export default function Token() {
  const id: string = useSearchParams().get("id") as string;
  const [token, setToken] = useState<IndexedToken>();
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    document.title = "NodeView | Token";
    if (!id) return;
    const fun = async () => {
      NETWORK.API()
        .blockchain.getTokenById(id)
        .then(
          (resp) => {
            setToken(resp.data);
            setLoading(false);
          },
          () => setLoading(false),
        );
    };
    fun();
  }, [id]);
  if (!token && !loading) {
    return Custom404();
  } else {
    return <TokenView token={token as IndexedToken} loading={loading} />;
  }
}
