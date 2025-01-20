import {
  ErgoApi,
  ErgoTransaction,
  IndexedErgoTransaction,
} from "@/lib/ergo-api";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Transaction() {
  const id: string = useRouter().query.id as string;
  const [tx, setTx] = useState<
    ErgoTransaction | IndexedErgoTransaction | undefined
  >();
  useEffect(() => {
    if (!id || id.length != 64) return;
    const api = new ErgoApi();
    api.baseUrl = "http://213.239.193.208:9053";
    const fun = async () => {
      api.transactions.getUnconfirmedTransactionById(id).then(
        (resp) => {
          setTx(resp.data);
          setTimeout(fun, 5000);
        },
        async () =>
          await api.blockchain.getTxById(id).then((resp) => setTx(resp.data))
      );
    };
    fun();
  }, [id]);
  if (!tx) {
    return <p>Not found tx with id {id}</p>;
  } else {
    return (
      <div>
        <p>
          Found {"index" in tx ? "confirmed" : "unconfirmed"} tx with id {tx.id}
        </p>
      </div>
    );
  }
}
