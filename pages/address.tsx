import { AddressView } from "@/components/ui/address-view";
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
          .getTxsByAddress(addr, { offset: 0, limit: 30 })
          .then((resp) => setTxs(resp.data));
      });
    };
    fun();
  }, [addr]);
  if (!balance || !txs) {
    return <p>Not found address {addr}</p>;
  } else {
    return <AddressView address={addr} txs={txs} balance={balance} />;
  }
}
