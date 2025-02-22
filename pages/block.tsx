import { BlockView } from "@/components/view/block-view";
import { FullBlock } from "@/lib/ergo-api";
import { NETWORK } from "@/lib/network";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Custom404 from "./404";
import { RustModule } from "@/lib/wasm";

export default function Block() {
  const id: string = useSearchParams().get("id") as string;
  const [block, setBlock] = useState<FullBlock>();
  const [loading, setLoading] = useState<boolean>(true);
  const GetBlockById: (x: string) => void = (blockId) =>
    NETWORK.API()
      .blocks.getFullBlockById(blockId)
      .then(
        (resp) => {
          setBlock(resp.data);
          setLoading(false);
        },
        () => setLoading(false),
      );
  useEffect(() => {
    document.title = "NodeView | Block";
    if (!id) return;
    const fun = async () => {
      setLoading(true);
      await RustModule.load();
      if (id.length == 64) {
        GetBlockById(id);
      } else {
        NETWORK.API()
          .blocks.getFullBlockAt(parseInt(id))
          .then((resp) => GetBlockById(resp.data[0]));
      }
    };
    fun();
  }, [id]);
  if (!block && !loading) {
    return Custom404();
  } else {
    return <BlockView block={block as FullBlock} loading={loading} />;
  }
}
