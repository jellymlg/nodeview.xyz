import { TxView } from "@/components/view/tx-view";
import {
  Asset,
  ErgoApi,
  ErgoTransaction,
  ErgoTransactionOutput,
  IndexedErgoBox,
  IndexedErgoTransaction,
  IndexedToken,
} from "@/lib/ergo-api";
import { notFound, useSearchParams } from "next/navigation";
import React from "react";
import { useEffect, useRef, useState } from "react";

export default function Transaction() {
  const id: string = useSearchParams().get("id") as string;
  const [tx, setTx] = useState<ErgoTransaction | IndexedErgoTransaction>();
  const inputs = useRef<(ErgoTransactionOutput | IndexedErgoBox)[]>([]);
  const tokens = useRef<IndexedToken[]>([]);
  const tm = useRef<NodeJS.Timeout>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const forceUpdate = React.useReducer(() => ({}), {})[1] as () => void;
  useEffect(() => {
    document.title = "ErgoSpace | Transaction";
    if (!id || id.length != 64) return;
    const api = new ErgoApi();
    api.baseUrl = "http://213.239.193.208:9053";
    const fun = async () => {
      api.transactions.getUnconfirmedTransactionById(id).then(
        async (resp) => {
          setTx(resp.data);
          if (inputs.current.length == 0) {
            inputs.current = await api.utxo
              .getBoxWithPoolByIds(resp.data.inputs.map((x) => x.boxId))
              .then((resp) => resp.data);
            tokens.current = await api.blockchain
              .getTokensByIds(
                (inputs.current as (ErgoTransactionOutput | IndexedErgoBox)[])
                  .flatMap((x) => x.assets as Asset[])
                  .concat(resp.data.outputs.flatMap((y) => y.assets as Asset[]))
                  .map((x) => x.tokenId),
              )
              .then((resp) => resp.data);
            setLoading(false);
            forceUpdate();
          }
          tm.current = setTimeout(fun, 5000);
        },
        async () =>
          await api.blockchain.getTxById(id).then(
            async (resp) => {
              setTx(resp.data);
              if (inputs.current.length == 0) inputs.current = resp.data.inputs;
              if (tokens.current.length == 0) {
                const ids1: string[] = resp.data.inputs.flatMap((x) =>
                  x.assets?.map((y) => y.tokenId),
                ) as string[];
                const ids2: string[] = resp.data.outputs.flatMap((x) =>
                  x.assets?.map((y) => y.tokenId),
                ) as string[];
                tokens.current = await api.blockchain
                  .getTokensByIds(ids1.concat(ids2))
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
  }, [id]);
  if (!tx && !loading) {
    return notFound();
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
