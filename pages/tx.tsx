import { TxView } from "@/components/view/tx-view";
import {
  Asset,
  ErgoTransaction,
  IndexedErgoBox,
  IndexedErgoTransaction,
  IndexedToken,
} from "@/lib/ergo-api";
import { NETWORK } from "@/lib/network";
import { useSearchParams } from "next/navigation";
import React from "react";
import { useEffect, useRef, useState } from "react";
import Custom404 from "./404";
import { asIndexedBox } from "@/lib/utils";
import { RustModule } from "@/lib/wasm";

export default function Transaction() {
  const id: string = useSearchParams().get("id") as string;
  const [tx, setTx] = useState<ErgoTransaction | IndexedErgoTransaction>();
  const inputs = useRef<IndexedErgoBox[]>([]);
  const tokens = useRef<IndexedToken[]>([]);
  const tm = useRef<NodeJS.Timeout>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const forceUpdate = React.useReducer(() => ({}), {})[1] as () => void;
  useEffect(() => {
    document.title = "NodeView | Transaction";
    if (!id) return;
    const fun = async () => {
      await RustModule.load();
      NETWORK.API()
        .transactions.getUnconfirmedTransactionById(id)
        .then(
          async (resp) => {
            setTx(resp.data);
            if (inputs.current.length == 0) {
              inputs.current = await NETWORK.API()
                .utxo.getBoxWithPoolByIds(resp.data.inputs.map((x) => x.boxId))
                .then((resp) => resp.data.map(asIndexedBox));
              tokens.current = await NETWORK.API()
                .blockchain.getTokensByIds(
                  inputs.current
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
                    const dedupIds = [...new Set(ids1.concat(ids2))];
                    tokens.current = await NETWORK.API()
                      .blockchain.getTokensByIds(dedupIds)
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
  if (!tx && !loading) {
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
