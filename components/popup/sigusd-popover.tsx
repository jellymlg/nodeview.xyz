import { JSX } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import Image from "next/image";
import { SigmaUSDSwap } from "@/lib/constants/SigmaUSD";
import { Separator } from "../ui/separator";

function decimals(type: string): number {
  return Math.pow(10, type === "ERG" ? 9 : type === "SigUSD" ? 2 : 0);
}

export function SigmaUSDPopover(
  element: JSX.Element,
  sigmausdSwap: SigmaUSDSwap,
) {
  const inAmount = sigmausdSwap.inAmount / decimals(sigmausdSwap.inType);
  const outAmount = sigmausdSwap.outAmount / decimals(sigmausdSwap.outType);
  return (
    <Dialog>
      <DialogTrigger className="hover:cursor-pointer" asChild>
        {element}
      </DialogTrigger>
      <DialogContent className="w-1/4 max-h-[75%] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Image
              priority={true}
              width={30}
              height={30}
              src={"sigusd.svg"}
              alt={"sigmausd logo"}
              className="mr-2"
            />
            SigmaUSD operation overview
          </DialogTitle>
          <DialogDescription>
            {"Swap " + sigmausdSwap.inType + " to " + sigmausdSwap.outType}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-wrap w-full">
          <div className="w-2/4 flex content-center flex-wrap">
            Input amount:
          </div>
          <div className="w-2/4 truncate">
            {inAmount.toFixed(2) + " " + sigmausdSwap.inType}
          </div>
        </div>
        <Separator />
        <div className="flex flex-wrap w-full">
          <div className="w-2/4 flex content-center flex-wrap">
            Output amount:
          </div>
          <div className="w-2/4 truncate">
            {outAmount.toFixed(2) + " " + sigmausdSwap.outType}
          </div>
        </div>
        <Separator />
        <div className="flex flex-wrap w-full">
          <div className="w-2/4 flex content-center flex-wrap">
            Conversion rate:
          </div>
          <div className="w-2/4 truncate">
            {(outAmount / inAmount).toFixed(6) +
              " " +
              sigmausdSwap.inType +
              " / " +
              sigmausdSwap.outType}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
