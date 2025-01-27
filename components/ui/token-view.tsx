import { IndexedToken } from "@/lib/ergo-api";
import { Separator } from "./separator";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

interface TokenViewProps {
  token: IndexedToken;
}

export function TokenView({ token }: TokenViewProps) {
  return (
    <div>
      <div className="flex flex-wrap justify-center mx-auto rounded-lg border m-4 w-3/4 p-6 text-lg bg-black bg-opacity-70">
        <div className="flex flex-wrap w-full">
          <div className="w-1/4 flex content-center flex-wrap">Token id:</div>
          <div className="w-3/4 truncate">{token.id}</div>
        </div>
        <Separator className="m-3" />
        <div className="flex flex-wrap w-full">
          <div className="w-1/4 flex content-center flex-wrap">Name:</div>
          <div className="w-3/4 truncate flex content-center flex-wrap">
            {token.name}
            <Avatar className="inline-block w-[30px] h-[30px] ml-2">
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
          </div>
        </div>
        <Separator className="m-3" />
        <div className="flex flex-wrap w-full">
          <div className="w-1/4 flex content-center flex-wrap">
            Description:
          </div>
          <div className="w-3/4">{token.description}</div>
        </div>
        <Separator className="m-3" />
        <div className="flex flex-wrap w-full">
          <div className="w-1/4 flex content-center flex-wrap">
            Emission amount:
          </div>
          <div className="w-3/4 truncate">
            {token.emissionAmount / Math.pow(10, token.decimals)}
          </div>
        </div>
        <Separator className="m-3" />
        <div className="flex flex-wrap w-full">
          <div className="w-1/4 flex content-center flex-wrap">
            Creating box:
          </div>
          <div className="w-3/4 truncate">{token.boxId}</div>
        </div>
      </div>
    </div>
  );
}
