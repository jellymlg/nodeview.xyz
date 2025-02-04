import { TxView } from "@/components/view/tx-view";
import {
  Asset,
  ErgoTransaction,
  ErgoTransactionOutput,
  IndexedErgoBox,
  IndexedErgoTransaction,
  IndexedToken,
} from "@/lib/ergo-api";
import { NETWORK } from "@/lib/network";
import { useSearchParams } from "next/navigation";
import React from "react";
import { useEffect, useRef, useState } from "react";
import Custom404 from "./404";

export default function Transaction() {
  const id: string = useSearchParams().get("id") as string;
  const [tx, setTx] = useState<ErgoTransaction | IndexedErgoTransaction>();
  const inputs = useRef<(ErgoTransactionOutput | IndexedErgoBox)[]>([]);
  const tokens = useRef<IndexedToken[]>([]);
  const tm = useRef<NodeJS.Timeout>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const forceUpdate = React.useReducer(() => ({}), {})[1] as () => void;
  useEffect(() => {
    document.title = "NodeView | Transaction";
    const fun = async () => {
      NETWORK.API()
        .transactions.getUnconfirmedTransactionById(id)
        .then(
          async (resp) => {
            setTx(resp.data);
            if (inputs.current.length == 0) {
              inputs.current = await NETWORK.API()
                .utxo.getBoxWithPoolByIds(resp.data.inputs.map((x) => x.boxId))
                .then((resp) => resp.data);
              tokens.current = await NETWORK.API()
                .blockchain.getTokensByIds(
                  (inputs.current as (ErgoTransactionOutput | IndexedErgoBox)[])
                    .flatMap((x) => x.assets as Asset[])
                    .concat(
                      resp.data.outputs.flatMap((y) => y.assets as Asset[]),
                    )
                    .map((x) => x.tokenId),
                )
                .then((resp) => resp.data);
              setLoading(false);
              forceUpdate();
            }
            tm.current = setTimeout(fun, 5000);
          },
          async () =>
            await NETWORK.API()
              .blockchain.getTxById(id)
              .then(
                async (resp) => {
                  setTx(resp.data);
                  if (inputs.current.length == 0)
                    inputs.current = resp.data.inputs;
                  if (tokens.current.length == 0) {
                    const ids1: string[] = resp.data.inputs.flatMap((x) =>
                      x.assets?.map((y) => y.tokenId),
                    ) as string[];
                    const ids2: string[] = resp.data.outputs.flatMap((x) =>
                      x.assets?.map((y) => y.tokenId),
                    ) as string[];
                    tokens.current = await NETWORK.API()
                      .blockchain.getTokensByIds(ids1.concat(ids2))
                      .then((resp) => resp.data);
                    setLoading(false);
                    forceUpdate();
                  }
                },
                () => setLoading(false),
              ),
        );
    };
    fun();
    return () => clearTimeout(tm.current as NodeJS.Timeout);
  }, [id, forceUpdate]);
  if (!id || id.length != 64 || (!tx && !loading)) {
    return Custom404();
  } else {
    return (
      <TxView
        tx={tx as ErgoTransaction | IndexedErgoTransaction}
        inputs={inputs.current}
        tokens={tokens.current}
        loading={loading}
      ></TxView>
    );
  }
}
