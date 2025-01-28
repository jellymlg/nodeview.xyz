import {
  Asset,
  ErgoTransaction,
  ErgoTransactionOutput,
  IndexedErgoBox,
  IndexedErgoTransaction,
  IndexedToken,
} from "@/lib/ergo-api";
import { feeFromTx, MainNetAddressFromErgoTree } from "@/lib/utils";
import Link from "next/link";
import { Separator } from "./separator";
import { TxStatus } from "./tx-status";
import { TxType } from "./tx-type";
import { TokenInfo, TokenPopover } from "./token-popover";
import { Skeleton } from "./skeleton";

function makeBoxRow(
  box: IndexedErgoBox | ErgoTransactionOutput,
  tokensAll: IndexedToken[],
) {
  const address: string =
    "address" in box ? box.address : MainNetAddressFromErgoTree(box.ergoTree);
  const tokens: TokenInfo[] = (box.assets as Asset[]).map((t) => {
    const x = tokensAll.find((x) => x.id == t.tokenId) as IndexedToken;
    return {
      tokenId: t.tokenId,
      amount: t.amount,
      decimals: x ? x.decimals : 0,
      name: x ? x.name : "unknown",
    } as TokenInfo;
  });
  return (
    <div className="flex w-full p-1 justify-between" key={box.boxId}>
      <Link
        className="block text-primary w-3/4 truncate hover:underline"
        href={"../address?id=" + address}
      >
        {address}
      </Link>
      <div className="flex">
        <span className="whitespace-nowrap">
          {box.value / 1_000_000_000} ERG
        </span>
        {tokens.length > 0 ? (
          <TokenPopover tokens={tokens} text={"+" + tokens.length} />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

interface TxViewProps {
  tx: ErgoTransaction | IndexedErgoTransaction;
  inputs: ErgoTransactionOutput[] | IndexedErgoBox[];
  tokens: IndexedToken[];
  loading: boolean;
}

export function TxView({ tx, inputs, tokens, loading }: TxViewProps) {
  return (
    <div>
      <div className="flex flex-wrap justify-center mx-auto rounded-lg border m-4 w-3/4 p-6 text-lg bg-black bg-opacity-70">
        <div className="flex flex-wrap w-full">
          <div className="w-1/4 flex content-center flex-wrap">
            Transaction hash:
          </div>
          {loading ? (
            <Skeleton className="w-3/4" />
          ) : (
            <div className="w-3/4 truncate">{tx.id}</div>
          )}
        </div>
        <Separator className="m-3" />
        <div className="flex flex-wrap w-full">
          <div className="w-1/4 flex content-center flex-wrap">Status:</div>
          {loading ? (
            <Skeleton className="w-3/4" />
          ) : (
            <div className="w-3/4 truncate">
              <TxStatus confirmed={"index" in tx} />
            </div>
          )}
        </div>
        <Separator className="m-3" />
        <div className="flex flex-wrap w-full">
          <div className="w-1/4 flex content-center flex-wrap">Timestamp:</div>
          {loading ? (
            <Skeleton className="w-3/4" />
          ) : (
            <div className="w-3/4 truncate">
              {"index" in tx
                ? new Date(tx.timestamp).toLocaleString()
                : "Awaiting confirmation"}
            </div>
          )}
        </div>
        <Separator className="m-3" />
        <div className="flex flex-wrap w-full">
          <div className="w-1/4 flex content-center flex-wrap">
            Included in block:
          </div>
          {loading ? (
            <Skeleton className="w-3/4" />
          ) : (
            <div className="w-3/4 truncate">
              {"index" in tx ? (
                <Link
                  className="text-primary hover:underline"
                  href={"../block?id=" + tx.blockId}
                >
                  {tx.inclusionHeight}
                </Link>
              ) : (
                "Awaiting confirmation"
              )}
            </div>
          )}
        </div>
        <Separator className="m-3" />
        <div className="flex flex-wrap w-full">
          <div className="w-1/4 flex content-center flex-wrap">
            Confirmations:
          </div>
          {loading ? (
            <Skeleton className="w-3/4" />
          ) : (
            <div className="w-3/4 truncate">
              {"index" in tx ? tx.numConfirmations : "Awaiting confirmation"}
            </div>
          )}
        </div>
        <Separator className="m-3" />
        <div className="flex flex-wrap w-full">
          <div className="w-1/4 flex content-center flex-wrap">Size:</div>
          {loading ? (
            <Skeleton className="w-3/4" />
          ) : (
            <div className="w-3/4 truncate">
              {(tx.size as number) / 1000 + " kB"}
            </div>
          )}
        </div>
        <Separator className="m-3" />
        <div className="flex flex-wrap w-full">
          <div className="w-1/4 flex content-center flex-wrap">Fee:</div>
          {loading ? (
            <Skeleton className="w-3/4" />
          ) : (
            <div className="w-3/4 truncate">
              {feeFromTx(tx) / 1_000_000_000 + " ERG"}
            </div>
          )}
        </div>
        <Separator className="m-3" />
        <div className="flex flex-wrap w-full">
          <div className="w-1/4 flex content-center flex-wrap">Type:</div>
          {loading ? (
            <Skeleton className="w-3/4" />
          ) : (
            <div className="w-3/4 truncate">
              <TxType inputs={inputs} outputs={tx.outputs} />
            </div>
          )}
        </div>
      </div>
      {loading ? (
        ""
      ) : (
        <div className="flex flex-wrap mx-auto rounded-lg border m-4 w-3/4 p-6 justify-between bg-black bg-opacity-70">
          <div className="flex flex-wrap w-[49%] content-start">
            {inputs.map((x) => makeBoxRow(x, tokens))}
          </div>
          <Separator orientation="vertical" className="flex h-auto" />
          <div className="flex flex-wrap w-[49%] content-start">
            {tx.outputs.map((x) => makeBoxRow(x, tokens))}
          </div>
        </div>
      )}
    </div>
  );
}
