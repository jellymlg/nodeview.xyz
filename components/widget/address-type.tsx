import { ErgoDexAddresses } from "@/lib/constants/ErgoDex";
import { TypeSettings } from "@/lib/utils";
import { SigmaIcon } from "lucide-react";
import { ErgoDexIcon } from "./ergodex-icon";
import { RosenBridgeAddresses } from "@/lib/constants/RosenBridge";
import Image from "next/image";

interface AddressTypeProps {
  address: string;
}

function deduceType({ address }: AddressTypeProps): TypeSettings {
  // check ErgoDex addresses
  const ergodexAddress = ErgoDexAddresses.get(address);
  if (ergodexAddress)
    return {
      colors:
        "bg-orange-700 border-orange-700 text-orange-700 dark:text-orange-400 fill-orange-700 dark:fill-orange-400 stroke-orange-700 dark:stroke-orange-400",
      icon: <ErgoDexIcon width={20} height={20} />,
      text: ergodexAddress,
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
