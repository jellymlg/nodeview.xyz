import { AddressView } from "@/components/view/address-view";
import { DynamicPagination } from "@/components/dynamic-pagination";
import { BalanceInfo, IndexedErgoTransaction } from "@/lib/ergo-api";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { NETWORK } from "@/lib/network";
import { asIndexedTx, ErgoTreeFromMainNetAddress } from "@/lib/utils";
import Custom404 from "./404";

export interface TxsResponse {
  items?: IndexedErgoTransaction[];
  total?: number;
}

export interface BalanceResponse {
  confirmed?: BalanceInfo;
  unconfirmed?: BalanceInfo;
}

export default function Address() {
  document.title = "NodeView | Address";
  const addr: string = useSearchParams().get("id") as string;
  const page: number = parseInt(useSearchParams().get("page") ?? "1");
  const [txs, setTxs] = useState<TxsResponse>();
  const [balance, setBalance] = useState<BalanceResponse>();
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const fun = async () => {
      NETWORK.API()
        .blockchain.getAddressBalanceTotal(addr)
        .then(
          (resp) => {
            setBalance(resp.data);
            NETWORK.API()
              .blockchain.getTxsByAddress(addr, {
                offset: (page - 1) * 30,
                limit: 30,
              })
              .then(
                (resp) => {
                  const confirmed = resp.data;
                  setTxs(confirmed);
                  if (page > 1) setLoading(false);
                  else
                    NETWORK.API()
                      .transactions.getUnconfirmedTransactionsByErgoTree(
                        ErgoTreeFromMainNetAddress(addr),
                        { limit: 100, offset: 0 },
                      )
                      .then(
                        async (resp) => {
                          const unconfirmed = await Promise.all(
                            resp.data.map(asIndexedTx),
                          );
                          setTxs({
                            items: unconfirmed.concat(
                              confirmed.items as IndexedErgoTransaction[],
                            ),
                            total:
                              (confirmed.total as number) + unconfirmed.length,
                          });
                          setLoading(false);
                        },
                        () => setLoading(false),
                      );
                },
                () => setLoading(false),
              );
          },
          () => setLoading(false),
        );
    };
    fun();
  }, [addr, page]);
  if (addr.length < 10 || ((!balance || !txs) && !loading)) {
    return Custom404();
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
