import { IndexedErgoBox } from "@/lib/ergo-api";
import { ErgoDexIcon } from "./ergodex-icon";
import { ArrowLeftRightIcon, PickaxeIcon } from "lucide-react";
import {
  ErgoDexAddresses,
  ErgoDexContractTemplates,
} from "@/lib/constants/ErgoDex";
import { isMewFinanceOrder, templateFromBox, TypeSettings } from "@/lib/utils";
import {
  isRosenCollateral,
  isRosenPayment,
  isRosenTransferRequest,
} from "@/lib/constants/RosenBridge";
import Image from "next/image";
import { isSigmaUSDSwap } from "@/lib/constants/SigmaUSD";
import { RosenPopover } from "../popup/rosen-popover";
import { SigmaUSDPopover } from "../popup/sigusd-popover";
import { ErgoDexPopover } from "../popup/ergodex-popover";

function deduceType({ inputs, outputs }: TxTypeProps): TypeSettings {
  // check ErgoDex contracts
  const settledOrder = inputs.find((x) =>
    ErgoDexContractTemplates.has(templateFromBox(x)),
  );
  const submittedOrder = outputs.find((x) =>
    ErgoDexContractTemplates.has(templateFromBox(x)),
  );
  const poolActionIn = inputs.find((x) =>
    ErgoDexAddresses.get(x.address)?.includes("Swap"),
  );
  const poolActionOut = outputs.find((x) =>
    ErgoDexAddresses.get(x.address)?.includes("Swap"),
  );
  if (
    settledOrder ||
    submittedOrder ||
    (poolActionIn &&
      poolActionOut &&
      ErgoDexAddresses.get(poolActionIn.address) ==
        ErgoDexAddresses.get(poolActionOut.address))
  ) {
    const txt: string =
      settledOrder || submittedOrder
        ? ErgoDexContractTemplates.get(
            templateFromBox(settledOrder ?? submittedOrder!),
          ) + (settledOrder ? " settled" : " submitted")
        : ErgoDexAddresses.get(poolActionIn!.address)!;
    const isMewFinance = isMewFinanceOrder(settledOrder, submittedOrder);
    return {
      colors: isMewFinance
        ? "bg-purple-600 border-purple-600 text-purple-200"
        : "bg-orange-700 border-orange-700 text-orange-700 dark:text-orange-400 fill-orange-700 dark:fill-orange-400 stroke-orange-700 dark:stroke-orange-400",
      icon: isMewFinance ? (
        <Image
          priority={true}
          width={20}
          height={20}
          src={"mew.svg"}
          alt={"mew logo"}
        />
      ) : (
        <ErgoDexIcon width={20} height={20} />
      ),
      wrapper: ErgoDexPopover,
      props: [settledOrder, submittedOrder, poolActionIn, poolActionOut, txt],
      text: txt,
    };
  }
  // check Rosen Bridge events
  const rosenTransfer = outputs.map(isRosenTransferRequest).find((x) => x);
  const rosenPayment = inputs.map(isRosenPayment).find((x) => x);
  const rosenTrigger = outputs.map(isRosenPayment).find((x) => x);
  const rosenCollateral = isRosenCollateral(inputs, outputs);
  if (rosenCollateral || rosenTransfer || rosenPayment || rosenTrigger) {
    const text = rosenTransfer
      ? "Transfer request to " + rosenTransfer.toChain
      : rosenPayment
        ? "Transfer from " +
          rosenPayment.fromChain +
          " to " +
          rosenPayment.toChain
        : rosenTrigger
          ? "Trigger from " +
            rosenTrigger.fromChain +
            " to " +
            rosenTrigger.toChain
          : (rosenCollateral?.type as string);
    return {
      colors: "bg-indigo-600 border-indigo-600 text-indigo-200",
      icon: (
        <Image
          priority={true}
          width={20}
          height={20}
          src={"rosen.svg"}
          alt={"rosen bridge logo"}
        />
      ),
      wrapper: RosenPopover,
      props: [rosenTransfer, rosenPayment, rosenTrigger, rosenCollateral, text],
      text: text,
    };
  }
  const sigmausdSwap = isSigmaUSDSwap(inputs[0], outputs[0]);
  if (sigmausdSwap)
    return {
      colors: "bg-purple-600 border-purple-600 text-purple-200",
      icon: (
        <Image
          priority={true}
          width={20}
          height={20}
          src={"sigusd.svg"}
          alt={"sigmausd logo"}
        />
      ),
      wrapper: SigmaUSDPopover,
      props: [sigmausdSwap],
      text: "Swap " + sigmausdSwap.inType + " to " + sigmausdSwap.outType,
    };
  const blockReward =
    templateFromBox(outputs[0]) === "ea02d192a39a8cc7a70173007301";
  if (blockReward)
    return {
      colors: "bg-red-600 border-red-600 text-red-300",
      icon: <PickaxeIcon width={20} height={20} />,
      wrapper: (x) => x,
      props: [],
      text: "Block reward",
    };
  // no special type detected
  return {
    colors: "bg-blue-600 border-blue-600 text-blue-900 dark:text-blue-300",
    icon: <ArrowLeftRightIcon width={20} height={20} />,
    wrapper: (x) => x,
    props: [],
    text: "Transfer",
  };
}

interface TxTypeProps {
  inputs: IndexedErgoBox[];
  outputs: IndexedErgoBox[];
}

export function TxType({ inputs, outputs }: TxTypeProps) {
  const type = deduceType({ inputs, outputs });
  const content = (
    <div
      className={
        "flex items-center bg-opacity-50 border rounded-lg w-fit p-1 " +
        type.colors
      }
    >
      {type.icon}
      <span className="text-sm pl-1">{type.text}</span>
    </div>
  );
  return type.wrapper(content, ...type.props);
}
