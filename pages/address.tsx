import { AddressView } from "@/components/view/address-view";
import { DynamicPagination } from "@/components/dynamic-pagination";
import { BalanceInfo, IndexedErgoTransaction } from "@/lib/ergo-api";
import { notFound, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { NETWORK } from "@/lib/network";

export interface TxsResponse {
  items?: IndexedErgoTransaction[];
  total?: number;
}

export interface BalanceResponse {
  confirmed?: BalanceInfo;
  unconfirmed?: BalanceInfo;
}

export default function Address() {
  document.title = "ErgoSpace | Address";
  const addr: string = useSearchParams().get("id") as string;
  const page: number = parseInt(useSearchParams().get("page") ?? "1");
  const [txs, setTxs] = useState<TxsResponse>();
  const [balance, setBalance] = useState<BalanceResponse>();
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    if (!addr) return;
    const fun = async () => {
      NETWORK.API()
        .blockchain.getAddressBalanceTotal(addr)
        .then((resp) => {
          setBalance(resp.data);
          NETWORK.API()
            .blockchain.getTxsByAddress(addr, {
              offset: (page - 1) * 30,
              limit: 30,
            })
            .then((resp) => {
              setTxs(resp.data);
              setLoading(false);
            });
        });
    };
    fun();
  }, [addr, page]);
  if ((!balance || !txs) && !loading) {
    return notFound();
  } else {
    return (
      <div>
        <AddressView
          address={addr}
          txs={txs}
          balance={balance as BalanceResponse}
          loading={loading}
        />
        {loading ? (
          ""
        ) : (
          <DynamicPagination
            current={page}
            lastElemNum={(txs?.total as number) - page * 30}
            urlBase={"/address?id=" + addr + "&page="}
          />
        )}
      </div>
    );
  }
}
