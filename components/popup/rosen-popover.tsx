import { JSX } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  RosenBridgeTransferRequest,
  RosenBridgeTransferPayment,
  RosenBridgeCollateralOperation,
} from "@/lib/constants/RosenBridge";
import { Separator } from "../ui/separator";
import Image from "next/image";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

function RosenTransferPayment(x: RosenBridgeTransferPayment) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap w-full">
        <div className="w-1/4 flex content-center flex-wrap">Source tx:</div>
        <div className="w-3/4 truncate">
          {ExplorerTx(x.sourceTx, x.fromChain)}
        </div>
      </div>
      <Separator />
      <div className="flex flex-wrap w-full">
        <div className="w-1/4 flex content-center flex-wrap">From chain:</div>
        <div className="w-3/4 truncate">{x.fromChain}</div>
      </div>
      <Separator />
      <div className="flex flex-wrap w-full">
        <div className="w-1/4 flex content-center flex-wrap">To chain:</div>
        <div className="w-3/4 truncate">{x.toChain}</div>
      </div>
      <Separator />
      <div className="flex flex-wrap w-full">
        <div className="w-1/4 flex content-center flex-wrap">From address:</div>
        <div className="w-3/4 truncate">
          {ExplorerAddress(x.fromAddress, x.fromChain)}
        </div>
      </div>
      <Separator />
      <div className="flex flex-wrap w-full">
        <div className="w-1/4 flex content-center flex-wrap">To address:</div>
        <div className="w-3/4 truncate">
          {ExplorerAddress(x.toAddress, x.toChain)}
        </div>
      </div>
      <Separator />
      <div className="flex flex-wrap w-full">
        <div className="w-1/4 flex content-center flex-wrap">Amount:</div>
        <div className="w-3/4 truncate">{x.amount}</div>
      </div>
      <Separator />
      <div className="flex flex-wrap w-full">
        <div className="w-1/4 flex content-center flex-wrap">Bridge fee:</div>
        <div className="w-3/4 truncate">{x.bridgeFee}</div>
      </div>
      <Separator />
      <div className="flex flex-wrap w-full">
        <div className="w-1/4 flex content-center flex-wrap">Network fee:</div>
        <div className="w-3/4 truncate">{x.networkFee}</div>
      </div>
      <Separator />
      <div className="flex flex-wrap w-full">
        <div className="w-1/4 flex content-center flex-wrap">Source token:</div>
        <div className="w-3/4 truncate">
          {ExplorerToken(x.sourceToken, x.fromChain)}
        </div>
      </div>
      <Separator />
      <div className="flex flex-wrap w-full">
        <div className="w-1/4 flex content-center flex-wrap">
          Destination token:
        </div>
        <div className="w-3/4 truncate">
          {ExplorerToken(x.destinationToken, x.toChain)}
        </div>
      </div>
      <Separator />
      <div className="flex flex-wrap w-full">
        <div className="w-1/4 flex content-center flex-wrap">
          Source block id:
        </div>
        <div className="w-3/4 truncate">
          {ExplorerBlockId(x.sourceBlockId, x.fromChain)}
        </div>
      </div>
      <Separator />
      <div className="flex flex-wrap w-full">
        <div className="w-1/4 flex content-center flex-wrap">
          Source block height:
        </div>
        <div className="w-3/4 truncate">
          {ExplorerBlockHeight(x.sourceBlockHeight, x.fromChain)}
        </div>
      </div>
    </div>
  );
}

function ExplorerTx(id: string, chain: string): JSX.Element {
  switch (chain) {
    case "ergo":
      return (
        <Link
          className="text-primary hover:underline"
          href={"/tx?id=" + id}
          target="_blank"
        >
          {id}
        </Link>
      );
    case "cardano":
      return (
        <Link
          className="text-primary hover:underline"
          href={"https://cardanoscan.io/transaction/" + id}
          target="_blank"
        >
          {id}
        </Link>
      );
    case "ethereum":
      return (
        <Link
          className="text-primary hover:underline"
          href={"https://etherscan.io/tx/" + id}
          target="_blank"
        >
          {id}
        </Link>
      );
    case "bitcoin":
      return (
        <Link
          className="text-primary hover:underline"
          href={"https://www.blockchain.com/explorer/transactions/btc/" + id}
          target="_blank"
        >
          {id}
        </Link>
      );
    default:
      return <p>{id}</p>;
  }
}

function ExplorerAddress(addr: string, chain: string): JSX.Element {
  switch (chain) {
    case "ergo":
      return (
        <Link
          className="text-primary hover:underline"
          href={"/address?id=" + addr}
          target="_blank"
        >
          {addr}
        </Link>
      );
    case "cardano":
      return (
        <Link
          className="text-primary hover:underline"
          href={"https://cardanoscan.io/address/" + addr}
          target="_blank"
        >
          {addr}
        </Link>
      );
    case "ethereum":
      return (
        <Link
          className="text-primary hover:underline"
          href={"https://etherscan.io/address/" + addr}
          target="_blank"
        >
          {addr}
        </Link>
      );
    case "bitcoin":
      return (
        <Link
          className="text-primary hover:underline"
          href={
            "https://www.blockchain.com/explorer/transactions/btc/" +
            addr.slice(4, -2)
          }
          target="_blank"
        >
          {addr.slice(4, -2)}
        </Link>
      );
    default:
      return <p>{addr}</p>;
  }
}

function ExplorerBlockId(id: string, chain: string): JSX.Element {
  switch (chain) {
    case "ergo":
      return (
        <Link
          className="text-primary hover:underline"
          href={"/block?id=" + id}
          target="_blank"
        >
          {id}
        </Link>
      );
    case "cardano":
      return (
        <Link
          className="text-primary hover:underline"
          href={"https://adastat.net/blocks/" + id}
          target="_blank"
        >
          {id}
        </Link>
      );
    case "ethereum":
      return (
        <Link
          className="text-primary hover:underline"
          href={"https://etherscan.io/block/" + id}
          target="_blank"
        >
          {id}
        </Link>
      );
    case "bitcoin":
      return (
        <Link
          className="text-primary hover:underline"
          href={"https://www.blockchain.com/explorer/blocks/btc/" + id}
          target="_blank"
        >
          {id}
        </Link>
      );
    default:
      return <p>{id}</p>;
  }
}

function ExplorerBlockHeight(height: bigint, chain: string): JSX.Element {
  switch (chain) {
    case "ergo":
      return (
        <Link
          className="text-primary hover:underline"
          href={"/block?id=" + height}
          target="_blank"
        >
          {height}
        </Link>
      );
    case "cardano":
      return (
        <Link
          className="text-primary hover:underline"
          href={"https://cardanoscan.io/block/" + height}
          target="_blank"
        >
          {height}
        </Link>
      );
    case "ethereum":
      return (
        <Link
          className="text-primary hover:underline"
          href={"https://etherscan.io/block/" + height}
          target="_blank"
        >
          {height}
        </Link>
      );
    case "bitcoin":
      return (
        <Link
          className="text-primary hover:underline"
          href={"https://www.blockchain.com/explorer/blocks/btc/" + height}
          target="_blank"
        >
          {height}
        </Link>
      );
    default:
      return <p>{height}</p>;
  }
}

function ExplorerToken(id: string, chain: string): JSX.Element {
  switch (chain) {
    case "ergo":
      return id == "erg" ? (
        <p>{id}</p>
      ) : (
        <Link
          className="text-primary hover:underline"
          href={"/token?id=" + id}
          target="_blank"
        >
          {id}
        </Link>
      );
    case "cardano":
      return (
        <Link
          className="text-primary hover:underline"
          href={"https://cardanoscan.io/token/" + id}
          target="_blank"
        >
          {id}
        </Link>
      );
    case "ethereum":
      return (
        <Link
          className="text-primary hover:underline"
          href={"https://etherscan.io/token/" + id}
          target="_blank"
        >
          {id}
        </Link>
      );
    case "bitcoin": // no tokens on btc
    default:
      return <p>{id}</p>;
  }
}

export function RosenPopover(
  element: JSX.Element,
  rosenTransfer: RosenBridgeTransferRequest | undefined,
  rosenPayment: RosenBridgeTransferPayment | undefined,
  rosenTrigger: RosenBridgeTransferPayment | undefined,
  rosenCollateral: RosenBridgeCollateralOperation | undefined,
  text: string,
) {
  return (
    <Dialog>
      <DialogTrigger className="hover:cursor-pointer" asChild>
        {element}
      </DialogTrigger>
      <DialogContent className="w-2/5 max-h-[100%] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Image
              priority={true}
              width={30}
              height={30}
              src={"rosen.svg"}
              alt={"rosen bridge logo"}
              className="mr-2"
            />
            Rosen Bridge operation overview
          </DialogTitle>
          <DialogDescription>{text}</DialogDescription>
        </DialogHeader>
        {rosenTransfer ? (
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap w-full">
              <div className="w-1/4 flex content-center flex-wrap">
                To chain:
              </div>
              <div className="w-3/4 truncate">{rosenTransfer.toChain}</div>
            </div>
            <Separator />
            <div className="flex flex-wrap w-full">
              <div className="w-1/4 flex content-center flex-wrap">
                To address:
              </div>
              <div className="w-3/4 truncate">
                {ExplorerAddress(
                  rosenTransfer.toAddress,
                  rosenTransfer.toChain,
                )}
              </div>
            </div>
            <Separator />
            <div className="flex flex-wrap w-full">
              <div className="w-1/4 flex content-center flex-wrap">
                Network fee:
              </div>
              <div className="w-3/4 truncate">{rosenTransfer.networkFee}</div>
            </div>
            <Separator />
            <div className="flex flex-wrap w-full">
              <div className="w-1/4 flex content-center flex-wrap">
                Bridge fee:
              </div>
              <div className="w-3/4 truncate">{rosenTransfer.bridgeFee}</div>
            </div>
            <Separator />
            <div className="flex flex-wrap w-full">
              <div className="w-1/4 flex content-center flex-wrap">
                From address:
              </div>
              <div className="w-3/4 truncate">
                {ExplorerAddress(rosenTransfer.fromAddress, "ergo")}
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        {rosenPayment ? RosenTransferPayment(rosenPayment) : ""}
        {rosenTrigger ? RosenTransferPayment(rosenTrigger) : ""}
        {rosenCollateral ? (
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap w-full">
              <div className="w-1/4 flex content-center flex-wrap">
                Watcher collateral:
              </div>
              <div className="w-3/4 truncate">
                {rosenCollateral.inAmount == 0 ||
                rosenCollateral.outAmount == 0 ? (
                  <div>
                    {rosenCollateral.inAmount == 0
                      ? "0 RSN + 0 ERG"
                      : "30000 RSN + 800 ERG"}
                    <ArrowRightIcon className="inline mx-1 p-1" />
                    {rosenCollateral.outAmount == 0
                      ? "0 RSN + 0 ERG"
                      : "30000 RSN + 800 ERG"}
                  </div>
                ) : (
                  "30000 RSN + 800 ERG"
                )}
              </div>
            </div>
            <Separator />
            <div className="flex flex-wrap w-full">
              <div className="w-1/4 flex content-center flex-wrap">
                Permit collateral:
              </div>
              <div className="w-3/4 truncate">
                {rosenCollateral.inAmount / 1000 + " RSN"}
                <ArrowRightIcon className="inline mx-1 p-1" />
                {rosenCollateral.outAmount / 1000 + " RSN"}
              </div>
            </div>
            <Separator />
            <div className="flex flex-wrap w-full">
              <div className="w-1/4 flex content-center flex-wrap">
                Permit count:
              </div>
              <div className="w-3/4 truncate">
                {Math.floor(rosenCollateral.inAmount / 3000_000).toFixed()}
                <ArrowRightIcon className="inline mx-1 p-1" />
                {Math.floor(rosenCollateral.outAmount / 3000_000).toFixed()}
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </DialogContent>
    </Dialog>
  );
}
