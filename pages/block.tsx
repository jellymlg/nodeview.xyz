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
  useEffect(() => {
    document.title = "NodeView | Block";
    if (!id) return;
    const fun = async () => {
      setLoading(true);
      await RustModule.load();
      NETWORK.API()
        .blocks.getFullBlockById(id)
        .then(
          (resp) => {
            setBlock(resp.data);
            setLoading(false);
          },
          () => setLoading(false),
        );
    };
    fun();
  }, [id]);
  if (!block && !loading) {
    return Custom404();
  } else {
    return <BlockView block={block as FullBlock} loading={loading} />;
  }
}
