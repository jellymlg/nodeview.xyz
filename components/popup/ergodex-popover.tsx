import { JSX, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { ErgoDexIcon } from "../widget/ergodex-icon";
import { ParseErgoDexOrder } from "@/lib/constants/ErgoDex";
import {
  CFMMPool,
  CFMMPoolAction,
  ErgoBoxStub,
} from "@/lib/constants/dex_parsers/Types";
import { Separator } from "../ui/separator";
import { IndexedErgoBox, IndexedToken } from "@/lib/ergo-api";
import { NETWORK } from "@/lib/network";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Image from "next/image";
import Link from "next/link";

function MakeTokenRow(
  amountWithId: string,
  tokens: IndexedToken[],
): JSX.Element {
  if (tokens.length == 0) return <></>;
  const amount: number = parseInt(amountWithId.split(";")[0]);
  const id: string = amountWithId.split(";")[1];
  const token = tokens.find((x) => x.id == id)!;
  return (
    <div className="flex content-center">
      {amount / Math.pow(10, token.decimals)}
      <Avatar className="inline-block w-[30px] h-[30px] mx-2">
        <AvatarImage
          src={
            "https://raw.githubusercontent.com/spectrum-finance/token-logos/refs/heads/master/logos/ergo/" +
            token.id +
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
      {token.id == ERG.id ? (
        "ERG"
      ) : (
        <Link
          href={"../token?id=" + token.id}
          className="text-primary hover:underline"
        >
          {token.name == "" ? "[name]" : token.name}
        </Link>
      )}
    </div>
  );
}

const ERG: IndexedToken = {
  id: "0000000000000000000000000000000000000000000000000000000000000000",
  boxId: "0000000000000000000000000000000000000000000000000000000000000000",
  emissionAmount: 0,
  name: "ERG",
  description: "ERG",
  decimals: 9,
};

export function ErgoDexPopover(
  element: JSX.Element,
  settledOrder: IndexedErgoBox | undefined,
  submittedOrder: IndexedErgoBox | undefined,
  poolActionIn: IndexedErgoBox | undefined,
  poolActionOut: IndexedErgoBox | undefined,
  text: string,
) {
  const order =
    settledOrder || submittedOrder
      ? ParseErgoDexOrder(new ErgoBoxStub((settledOrder ?? submittedOrder)!))
      : undefined;
  const props = order
    ? order.listProperties()
    : new CFMMPoolAction(
        CFMMPool.fromBox(poolActionIn!)!,
        CFMMPool.fromBox(poolActionOut!)!,
      ).listProperties();
  const [tokens, setTokens] = useState<IndexedToken[]>([]);
  const fetchTokenInfo = async () => {
    if (tokens.length > 0) return;
    setTokens(
      await NETWORK.API()
        .blockchain.getTokensByIds(
          props
            .filter((x) => x[1].includes(";"))
            .map((x) => x[1].split(";")[1]),
        )
        .then((resp) => resp.data.concat([ERG])),
    );
  };
  return (
    <Dialog>
      <DialogTrigger
        className="hover:cursor-pointer"
        asChild
        onClick={() => fetchTokenInfo()}
      >
        {element}
      </DialogTrigger>
      <DialogContent className="w-1/2 max-h-[100%] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <ErgoDexIcon
              width={30}
              height={30}
              className="mr-2 fill-orange-700 stroke-orange-700 dark:fill-orange-400 dark:stroke-orange-400"
            />
            ErgoDex operation overview
          </DialogTitle>
          <DialogDescription>
            {text + (order ? "    (" + order.typeName() + ")" : "")}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          {props.map((prop, i) => (
            <div className="contents gap-4" key={i}>
              <div className="flex flex-wrap w-full">
                <div className="w-1/4 flex content-center flex-wrap">
                  {prop[0]}
                </div>
                <div className="w-3/4 truncate">
                  {prop[1].includes(";")
                    ? MakeTokenRow(prop[1], tokens)
                    : prop[1]}
                </div>
              </div>
              {i < props.length - 1 ? <Separator /> : ""}
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
