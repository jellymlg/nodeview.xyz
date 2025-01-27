import { AddressView } from "@/components/ui/address-view";
import { DynamicPagination } from "@/components/ui/dynamic-pagination";
import { BalanceInfo, ErgoApi, IndexedErgoTransaction } from "@/lib/ergo-api";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export interface TxsResponse {
  items?: IndexedErgoTransaction[];
  total?: number;
}

export interface BalanceResponse {
  confirmed?: BalanceInfo;
  unconfirmed?: BalanceInfo;
}

export default function Address() {
  const addr: string = useSearchParams().get("id") as string;
  const page: number = parseInt(useSearchParams().get("page") ?? "1");
  const [txs, setTxs] = useState<TxsResponse>();
  const [balance, setBalance] = useState<BalanceResponse>();
  useEffect(() => {
    if (!addr) return;
    const api = new ErgoApi();
    api.baseUrl = "http://213.239.193.208:9053";
    const fun = async () => {
      api.blockchain.getAddressBalanceTotal(addr).then((resp) => {
        setBalance(resp.data);
        api.blockchain
          .getTxsByAddress(addr, { offset: (page - 1) * 30, limit: 30 })
          .then((resp) => setTxs(resp.data));
      });
    };
    fun();
  }, [addr, page]);
  if (!balance || !txs) {
    return <p>Not found address {addr}</p>;
  } else {
    return (
      <div className="flex flex-wrap justify-center">
        <AddressView address={addr} txs={txs} balance={balance} />
        <DynamicPagination
          current={page}
          lastElemNum={(txs.total as number) - page * 30}
          urlBase={"/address?id=" + addr + "&page="}
        />
      </div>
    );
  }
}
