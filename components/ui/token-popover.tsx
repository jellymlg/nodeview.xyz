import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Button } from "./button";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import Image from "next/image";
import Link from "next/link";
import { ScrollArea } from "./scroll-area";

export interface TokenInfo {
  tokenId: string;
  amount: number;
  decimals: number;
  name: string;
}

interface TokenPopoverProps {
  tokens: TokenInfo[];
  text: string;
}

export function TokenPopover({ tokens, text }: TokenPopoverProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="p-0 h-auto" variant="link">
          {text}
        </Button>
      </PopoverTrigger>
      <PopoverContent side="right" className="p-0 w-auto">
        <ScrollArea className="[&>[data-radix-scroll-area-viewport]]:max-h-[500px]">
          {tokens.map((token) => (
            <div
              className="flex flex-wrap content-center hover:bg-muted transition-colors rounded-lg m-4"
              key={token.tokenId}
            >
              <Avatar className="flex m-2">
                <AvatarImage
                  src={
                    "https://raw.githubusercontent.com/spectrum-finance/token-logos/refs/heads/master/logos/ergo/" +
                    token.tokenId +
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
              <div className="flex flex-col justify-center">
                <p className="mr-2 text-primary hover:underline">
                  <Link href={"../token?id=" + token.tokenId}>
                    {token.name == "" ? "[name]" : token.name}
                  </Link>
                </p>
                <p className="mr-2">
                  {token.amount / Math.pow(10, token.decimals)}
                </p>
              </div>
            </div>
          ))}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
