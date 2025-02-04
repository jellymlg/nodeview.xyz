import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { NETWORK } from "@/lib/network";

async function lookup(str: string) {
  const address = await NETWORK.API()
    .blockchain.getAddressBalanceTotal(str)
    .then((resp) => resp.data)
    .catch(() => {});
  if (address) window.location.href = "/address?id=" + str;
  const txMem = await NETWORK.API()
    .transactions.getUnconfirmedTransactionById(str)
    .then((resp) => resp.data)
    .catch(() => {});
  if (txMem) window.location.href = "/tx?id=" + str;
  const txConf = await NETWORK.API()
    .blockchain.getTxById(str)
    .then((resp) => resp.data)
    .catch(() => {});
  if (txConf) window.location.href = "/tx?id=" + str;
  const token = await NETWORK.API()
    .blockchain.getTokenById(str)
    .then((resp) => resp.data)
    .catch(() => {});
  if (token) window.location.href = "/token?id=" + str;
  const block = await NETWORK.API()
    .blocks.getBlockHeaderById(str)
    .then((resp) => resp.data)
    .catch(() => {});
  if (block) window.location.href = "/block?id=" + str;
  else window.location.href = "/nothing";
}

export function Navbar() {
  const [search, setSearch] = useState<string>("");
  return (
    <NavigationMenu className="w-full mx-auto p-4 border rounded-lg">
      <Image
        priority={true}
        width={0}
        height={0}
        src="logo.svg"
        alt="ergo logo"
        className="w-32 ml-5"
      />
      <NavigationMenuList className="gap-16 w-full">
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle}>
              Home
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/blocks?page=1" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle}>
              Blocks
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/mempool" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle}>
              Mempool
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
      <Input
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") lookup(search);
        }}
        placeholder="Search  for   Address  /  Transaction  /  Token  /  Block"
      />
      <Button onClick={() => lookup(search)} className="ml-4">
        Search
      </Button>
    </NavigationMenu>
  );
}
