import { BlockView } from "@/components/ui/block-view";
import { ErgoApi, FullBlock } from "@/lib/ergo-api";
import { notFound, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Block() {
  document.title = "ErgoSpace | Block";
  const id: string = useSearchParams().get("id") as string;
  const [block, setBlock] = useState<FullBlock>();
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    if (!id || id.length != 64) return;
    const api = new ErgoApi();
    api.baseUrl = "http://213.239.193.208:9053";
    const fun = async () => {
      api.blocks.getFullBlockById(id).then((resp) => {
        setBlock(resp.data);
        setLoading(false);
      });
    };
    fun();
  }, [id]);
  if (!block && !loading) {
    return notFound();
  } else {
    return <BlockView block={block as FullBlock} loading={loading} />;
  }
}
