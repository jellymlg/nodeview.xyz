import { JSX } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { ErgoDexIcon } from "../widget/ergodex-icon";
import {
  ErgoDexContractTemplates,
  ParseErgoDexOrder,
} from "@/lib/constants/ErgoDex";
import { ErgoBoxStub } from "@/lib/constants/dex_parsers/Types";
import { Separator } from "../ui/separator";

export function ErgoDexPopover(
  element: JSX.Element,
  orderBox: ErgoBoxStub,
  type: string,
) {
  const order = ParseErgoDexOrder(orderBox)!;
  const props = order.listProperties();
  return (
    <Dialog>
      <DialogTrigger className="hover:cursor-pointer" asChild>
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
            {ErgoDexContractTemplates.get(orderBox.template) +
              " " +
              type +
              "    (" +
              order.typeName() +
              ")"}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          {props.map((prop, i) => (
            <>
              <div className="flex flex-wrap w-full" key={prop[0]}>
                <div className="w-1/4 flex content-center flex-wrap">
                  {prop[0]}
                </div>
                <div className="w-3/4 truncate">{prop[1]}</div>
              </div>
              {i < props.length - 1 ? <Separator /> : ""}
            </>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
