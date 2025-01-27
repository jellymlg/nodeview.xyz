import { BlockView } from "@/components/ui/block-view";
import { ErgoApi, FullBlock } from "@/lib/ergo-api";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Block() {
  const id: string = useSearchParams().get("id") as string;
  const [block, setBlock] = useState<FullBlock | undefined>();
  useEffect(() => {
    if (!id || id.length != 64) return;
    const api = new ErgoApi();
    api.baseUrl = "http://213.239.193.208:9053";
    const fun = async () => {
      api.blocks.getFullBlockById(id).then((resp) => setBlock(resp.data));
    };
    fun();
  }, [id]);
  if (!block) {
    return <p>Not found block with id {id}</p>;
  } else {
    return <BlockView block={block} />;
  }
}
