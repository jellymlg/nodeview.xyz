import { PriceView } from "@/components/view/price-view";

export default function Index() {
  document.title = "ErgoSpace | Home";
  return (
    <div className="flex flex-col">
      <p className="text-5xl text-center p-8 m-4">
        The decentralized blockchain explorer for Ergo
      </p>
      <PriceView />
      <div className="rounded-xl border mt-4">
        <p className="text-5xl text-center m-4">TODO node status</p>
      </div>
    </div>
  );
}
