import {
  Asset,
  ErgoTransaction,
  ErgoTransactionOutput,
  IndexedErgoBox,
  IndexedErgoTransaction,
  IndexedToken,
} from "@/lib/ergo-api";
import { feeFromTx } from "@/lib/utils";
import { ErgoAddress } from "@fleet-sdk/core";
import Link from "next/link";
import { Separator } from "./separator";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import Image from "next/image";

function makeBoxRow(
  box: IndexedErgoBox | ErgoTransactionOutput,
  tokensAll: IndexedToken[],
) {
  const address: string =
    "address" in box
      ? box.address
      : ErgoAddress.fromErgoTree(box.ergoTree).toString();
  const tokens: Asset[] = box.assets as Asset[];
  return (
    <div className="flex w-full p-1 justify-between" key={box.boxId}>
      <Link
        className="block underline text-primary w-3/4 truncate hover:no-underline"
        href={"../address?id=" + address}
      >
        {address}
      </Link>
      <div className="flex">
        <span className="flex items-center">
          {box.value / 1_000_000_000} ERG
        </span>
        {tokens.length > 0 ? (
          <Popover>
            <PopoverTrigger asChild>
              <Button className="p-0 h-auto" variant="link">
                +{tokens.length}
              </Button>
            </PopoverTrigger>
            <PopoverContent side="right" className="w-80 h-2/5">
              {tokens.map((token) => (
                <div key={token.tokenId}>
                  <Avatar>
                    <AvatarImage
                      src={
                        "https://raw.githubusercontent.com/spectrum-finance/token-logos/refs/heads/master/logos/ergo/" +
                        token.tokenId +
                        ".svg"
                      }
                    />
                    <AvatarFallback>
                      <Image
                        width={0}
                        height={0}
                        className="aspect-square h-full w-full"
                        src="https://raw.githubusercontent.com/spectrum-finance/token-logos/refs/heads/master/logos/empty.svg"
                        alt="Token logo"
                      />
                    </AvatarFallback>
                  </Avatar>
                  {tokensAll.find((x) => x.id == token.tokenId)?.name}
                  {token.amount}
                </div>
              ))}
            </PopoverContent>
          </Popover>
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
}

export function TxView({ tx, inputs, tokens }: TxViewProps) {
  return (
    <div>
      <div className="flex flex-wrap justify-center mx-auto rounded-lg border m-4 w-3/4 p-6 text-lg">
        <div className="flex flex-wrap w-full">
          <div className="w-1/4">Transaction hash:</div>
          <div className="w-3/4 truncate">{tx.id}</div>
        </div>
        <Separator className="m-3" />
        <div className="flex flex-wrap w-full">
          <div className="w-1/4">Status:</div>
          <div className="w-3/4 truncate">
            {"index" in tx ? "Confirmed" : "Unconfirmed"}
          </div>
        </div>
        <Separator className="m-3" />
        <div className="flex flex-wrap w-full">
          <div className="w-1/4">Timestamp:</div>
          <div className="w-3/4 truncate">
            {"index" in tx
              ? new Date(tx.timestamp).toLocaleString()
              : "Awaiting confirmation"}
          </div>
        </div>
        <Separator className="m-3" />
        <div className="flex flex-wrap w-full">
          <div className="w-1/4">Included in block:</div>
          <div className="w-3/4 truncate">
            {"index" in tx ? (
              <Link
                className="text-primary underline hover:no-underline"
                href={"../block?id=" + tx.blockId}
              >
                {tx.inclusionHeight}
              </Link>
            ) : (
              "Awaiting confirmation"
            )}
          </div>
        </div>
        <Separator className="m-3" />
        <div className="flex flex-wrap w-full">
          <div className="w-1/4">Confirmations:</div>
          <div className="w-3/4 truncate">
            {"index" in tx ? tx.numConfirmations : "Awaiting confirmation"}
          </div>
        </div>
        <Separator className="m-3" />
        <div className="flex flex-wrap w-full">
          <div className="w-1/4">Size:</div>
          <div className="w-3/4 truncate">
            {(tx.size as number) / 1000 + " kB"}
          </div>
        </div>
        <Separator className="m-3" />
        <div className="flex flex-wrap w-full">
          <div className="w-1/4">Fee:</div>
          <div className="w-3/4 truncate">
            {feeFromTx(tx) / 1_000_000_000 + " ERG"}
          </div>
        </div>
        <Separator className="m-3" />
        <div className="flex flex-wrap w-full">
          <div className="w-1/4">Type:</div>
          <div className="w-3/4 truncate">Some type TODO</div>
        </div>
      </div>
      <div className="flex flex-wrap mx-auto rounded-lg border m-4 w-3/4 p-6 justify-between">
        <div className="flex flex-wrap w-[49%] content-start">
          {inputs.map((x) => makeBoxRow(x, tokens))}
        </div>
        <Separator orientation="vertical" className="flex h-auto" />
        <div className="flex flex-wrap w-[49%] content-start">
          {tx.outputs.map((x) => makeBoxRow(x, tokens))}
        </div>
      </div>
    </div>
  );
}
