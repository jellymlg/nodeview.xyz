import { IndexedErgoBox } from "@/lib/ergo-api";
import { ErgoDexIcon } from "./ergodex-icon";
import { ArrowLeftRightIcon, PickaxeIcon } from "lucide-react";
import { ErgoDexContractTemplates } from "@/lib/constants/ErgoDex";
import { templateFromBox, TypeSettings } from "@/lib/utils";
import {
  isRosenCollateral,
  isRosenPayment,
  isRosenTransferRequest,
} from "@/lib/constants/RosenBridge";
import Image from "next/image";
import { isSigmaUSDSwap } from "@/lib/constants/SigmaUSD";

function deduceType({ inputs, outputs }: TxTypeProps): TypeSettings {
  // check ErgoDex contracts
  const settledOrder = inputs
    .map((x) => ErgoDexContractTemplates.get(templateFromBox(x)))
    .find((x) => x);
  const submittedOrder = outputs
    .map((x) => ErgoDexContractTemplates.get(templateFromBox(x)))
    .find((x) => x);
  if (settledOrder || submittedOrder)
    return {
      colors:
        "bg-orange-700 border-orange-700 text-orange-700 dark:text-orange-400 fill-orange-700 dark:fill-orange-400 stroke-orange-700 dark:stroke-orange-400",
      icon: <ErgoDexIcon width={20} height={20} />,
      text:
        (settledOrder ?? submittedOrder) +
        (settledOrder ? " settled" : " submitted"),
    };
  // check Rosen Bridge events
  const rosenTransfer = outputs.map(isRosenTransferRequest).find((x) => x);
  const rosenPayment = inputs.map(isRosenPayment).find((x) => x);
  const rosenTrigger = outputs.map(isRosenPayment).find((x) => x);
  const rosenCollateral = isRosenCollateral(inputs, outputs);
  if (rosenCollateral || rosenTransfer || rosenPayment || rosenTrigger)
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
      text: rosenTransfer
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
            : (rosenCollateral?.type as string),
    };
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
      text: sigmausdSwap.type,
    };
  const blockReward =
    templateFromBox(outputs[0]) === "ea02d192a39a8cc7a70173007301";
  if (blockReward)
    return {
      colors: "bg-red-600 border-red-600 text-red-300",
      icon: <PickaxeIcon width={20} height={20} />,
      text: "Block reward",
    };
  // no special type detected
  return {
    colors: "bg-blue-600 border-blue-600 text-blue-900 dark:text-blue-300",
    icon: <ArrowLeftRightIcon width={20} height={20} />,
    text: "Transfer",
  };
}

interface TxTypeProps {
  inputs: IndexedErgoBox[];
  outputs: IndexedErgoBox[];
}

export function TxType({ inputs, outputs }: TxTypeProps) {
  const type = deduceType({ inputs, outputs });
  return (
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
}
