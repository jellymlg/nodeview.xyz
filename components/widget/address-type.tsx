import {
  ErgoDexAddresses,
  ErgoDexContractTemplates,
} from "@/lib/constants/ErgoDex";
import { templateFromAddress, TypeSettings } from "@/lib/utils";
import { PickaxeIcon, SigmaIcon } from "lucide-react";
import { ErgoDexIcon } from "./ergodex-icon";
import { RosenBridgeAddresses } from "@/lib/constants/RosenBridge";
import Image from "next/image";
import { MiningPoolAddresses } from "@/lib/constants/MiningPools";
import { SigmaUSDBank } from "@/lib/constants/SigmaUSD";

interface AddressTypeProps {
  address: string;
}

function deduceType({ address }: AddressTypeProps): TypeSettings {
  // check ErgoDex addresses
  const ergodexAddress = ErgoDexAddresses.get(address);
  const ergodexProxy = ErgoDexContractTemplates.get(
    templateFromAddress(address),
  );
  if (ergodexAddress || ergodexProxy)
    return {
      colors:
        "bg-orange-700 border-orange-700 text-orange-700 dark:text-orange-400 fill-orange-700 dark:fill-orange-400 stroke-orange-700 dark:stroke-orange-400",
      icon: <ErgoDexIcon width={20} height={20} />,
      text: (ergodexAddress ?? ergodexProxy) as string,
    };
  // check Rosen Bridge addresses
  const rosenbridgeAddress = RosenBridgeAddresses.get(address);
  if (rosenbridgeAddress)
    return {
      colors: "bg-indigo-600 border-indigo-600 text-indigo-200",
      icon: (
        <Image
          width={20}
          height={20}
          src={"rosen.svg"}
          alt={"rosen bridge logo"}
        />
      ),
      text: rosenbridgeAddress,
    };
  const sigusdBank = address === SigmaUSDBank ? "SigmaUSD Bank" : undefined;
  if (sigusdBank)
    return {
      colors: "bg-purple-600 border-purple-600 text-purple-200",
      icon: (
        <Image
          width={20}
          height={20}
          src={"sigusd.svg"}
          alt={"sigmausd logo"}
        />
      ),
      text: sigusdBank,
    };
  const minigpoolAddress = MiningPoolAddresses.get(address);
  if (minigpoolAddress)
    return {
      colors: "bg-red-600 border-red-600 text-red-300",
      icon: <PickaxeIcon width={20} height={20} />,
      text: minigpoolAddress,
    };
  // no special type detected
  return {
    colors: "bg-blue-600 border-blue-600 text-blue-900 dark:text-blue-300",
    icon: <SigmaIcon width={20} height={20} />,
    text: "Personal",
  };
}

export function AddressType({ address }: AddressTypeProps) {
  const type = deduceType({ address });
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
