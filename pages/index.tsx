import { NodeView } from "@/components/view/node-view";
import { PriceView } from "@/components/view/price-view";

export default function Index() {
  document.title = "NodeView | Home";
  return (
    <div className="flex flex-col w-3/4 mx-auto">
      <p className="text-5xl text-center p-8 m-4">
        The decentralized blockchain explorer for Ergo
      </p>
      <PriceView />
      <NodeView />
    </div>
  );
}
