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

export function ErgoDexPopover(
  element: JSX.Element,
  settledOrder: string | undefined,
  submittedOrder: string | undefined,
) {
  return (
    <Dialog>
      <DialogTrigger className="hover:cursor-pointer" asChild>
        {element}
      </DialogTrigger>
      <DialogContent className="w-2/5 max-h-[75%] flex flex-col">
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
            {(settledOrder ?? submittedOrder) +
              (settledOrder ? " settled" : " submitted")}
          </DialogDescription>
        </DialogHeader>
        <p>TODO</p>
      </DialogContent>
    </Dialog>
  );
}
