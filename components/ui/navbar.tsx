import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Image from "next/image";
import Link from "next/link";
import { Input } from "./input";
import { Button } from "./button";
import { useState } from "react";
import { ErgoApi } from "@/lib/ergo-api";

async function lookup(str: string) {
  const api = new ErgoApi();
  api.baseUrl = "http://213.239.193.208:9053";
  console.log(str);
  const address = await api.blockchain
    .getAddressBalanceTotal(str)
    .then((resp) => resp.data)
    .catch(() => {});
  if (address) window.location.href = "/address?id=" + str;
  const txMem = await api.transactions
    .getUnconfirmedTransactionById(str)
    .then((resp) => resp.data)
    .catch(() => {});
  if (txMem) window.location.href = "/tx?id=" + str;
  const txConf = await api.blockchain
    .getTxById(str)
    .then((resp) => resp.data)
    .catch(() => {});
  if (txConf) window.location.href = "/tx?id=" + str;
  const token = await api.blockchain
    .getTokenById(str)
    .then((resp) => resp.data)
    .catch(() => {});
  if (token) window.location.href = "/token?id=" + str;
  const block = await api.blocks
    .getBlockHeaderById(str)
    .then((resp) => resp.data)
    .catch(() => {});
  if (block) window.location.href = "/block?id=" + str;
}

export function Navbar() {
  const [search, setSearch] = useState<string>("");
  return (
    <NavigationMenu className="w-full mx-auto p-4 border rounded-lg bg-black bg-opacity-70">
      <Image
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
        placeholder="Search  for   Address  /  Transaction  /  Token  /  Block"
      />
      <Button onClick={() => lookup(search)} className="ml-4">
        Search
      </Button>
    </NavigationMenu>
  );
}
