import { ErgoTransactionOutput, IndexedErgoBox } from "../ergo-api";
import { RustModule } from "../wasm";

export interface RosenBridgeTransferRequest {
  toChain: string;
  toAddress: string;
  networkFee: string;
  bridgeFee: string;
  fromAddress: string;
}

export function isRosenTransferRequest(
  box: ErgoTransactionOutput,
): RosenBridgeTransferRequest | undefined {
  const R4_base16 = box.additionalRegisters["R4"];
  if (!R4_base16) return undefined;
  const R4 = RustModule.SigmaRust.Constant.decode_from_base16(R4_base16);
  if (R4 && R4.dbg_tpe() === "SColl(SColl(SByte))") {
    const R4Arr = R4.to_coll_coll_byte();
    if (R4Arr.length != 5) return undefined;
    return {
      toChain: Buffer.from(R4Arr[0]).toString(),
      toAddress: Buffer.from(R4Arr[1]).toString(),
      networkFee: Buffer.from(R4Arr[2]).toString(),
      bridgeFee: Buffer.from(R4Arr[3]).toString(),
      fromAddress: Buffer.from(R4Arr[4]).toString(),
    };
  } else return undefined;
}

export interface RosenBridgeTransferPayment {
  sourceTx: string;
  fromChain: string;
  toChain: string;
  fromAddress: string;
  toAddress: string;
  amount: bigint;
  bridgeFee: bigint;
  networkFee: bigint;
  sourceToken: string;
  destinationToken: string;
  sourceBlockId: string;
  sourceBlockHeight: bigint;
}

export function isRosenPayment(
  box: ErgoTransactionOutput,
): RosenBridgeTransferPayment | undefined {
  const R5_base16 = box.additionalRegisters["R5"];
  if (!R5_base16) return undefined;
  const R5 = RustModule.SigmaRust.Constant.decode_from_base16(R5_base16);
  if (R5 && R5.dbg_tpe() === "SColl(SColl(SByte))") {
    const R5Arr = R5.to_coll_coll_byte();
    if (R5Arr.length != 12) return undefined;
    return {
      sourceTx: Buffer.from(R5Arr[0]).toString(),
      fromChain: Buffer.from(R5Arr[1]).toString(),
      toChain: Buffer.from(R5Arr[2]).toString(),
      fromAddress: Buffer.from(R5Arr[3]).toString(),
      toAddress: Buffer.from(R5Arr[4]).toString(),
      amount: new DataView(R5Arr[5].buffer).getBigUint64(0),
      bridgeFee: new DataView(R5Arr[6].buffer).getBigUint64(0),
      networkFee: new DataView(R5Arr[7].buffer).getBigUint64(0),
      sourceToken: Buffer.from(R5Arr[8]).toString(),
      destinationToken: Buffer.from(R5Arr[9]).toString(),
      sourceBlockId: Buffer.from(R5Arr[10]).toString(),
      sourceBlockHeight: new DataView(R5Arr[11].buffer).getBigUint64(0),
    };
  } else return undefined;
}

export interface RosenBridgeCollateralOperation {
  type: string;
  inAmount: number;
  outAmount: number;
}

export function isRosenCollateral(
  inputs: IndexedErgoBox[],
  outputs: IndexedErgoBox[],
): RosenBridgeCollateralOperation | undefined {
  const inColl = inputs.find((x) =>
    RosenBridgeAddresses.get(x.address)?.includes("Collateral"),
  );
  const outColl = outputs.find((x) =>
    RosenBridgeAddresses.get(x.address)?.includes("Collateral"),
  );
  if (inColl && outColl) {
    if (!inColl.additionalRegisters["R5"] || !outColl.additionalRegisters["R5"])
      return undefined;
    const inAmount = RustModule.SigmaRust.Constant.decode_from_base16(
      inColl.additionalRegisters["R5"],
    )
      .to_i64()
      .as_num();
    const outAmount = RustModule.SigmaRust.Constant.decode_from_base16(
      outColl.additionalRegisters["R5"],
    )
      .to_i64()
      .as_num();
    if (inAmount < outAmount) {
      return {
        type: "Add collateral",
        inAmount: inAmount,
        outAmount: outAmount,
      };
    } else {
      return {
        type: "Unlock partial collateral",
        inAmount: inAmount,
        outAmount: outAmount,
      };
    }
  }
  if (inColl && !outColl) {
    if (!inColl.additionalRegisters["R5"]) return undefined;
    const inAmount = RustModule.SigmaRust.Constant.decode_from_base16(
      inColl.additionalRegisters["R5"],
    )
      .to_i64()
      .as_num();
    return { type: "Unlock all collateral", inAmount: inAmount, outAmount: 0 };
  }
  if (!inColl && outColl) {
    if (!outColl.additionalRegisters["R5"]) return undefined;
    const outAmount = RustModule.SigmaRust.Constant.decode_from_base16(
      outColl.additionalRegisters["R5"],
    )
      .to_i64()
      .as_num();
    return { type: "Lock collateral", inAmount: 0, outAmount: outAmount };
  }
  return undefined;
}

export const RosenBridgeAddresses: Map<string, string> = new Map([
  [
    "2DxRv75maq3FewTq4mCgRzJedpUXxk5iUYhEEh7GifusR3sp4MN98RDo9dR7dvPkyKwKWJgxRMkoyYUCWUzEqzhJSTtTNSwckmbqvuAsbTbRF9EJqgMkQzLHWaqyMvdiBC1LGNyC16qWkp64oYn3nEL4qoZWUr79mLpaHLCnNAHkVPUuG45bqno9n6fLNKbsQV9CDvda8bMFHKPgnYrcGhWwt",
    "Old Watcher Collateral",
  ],
  [
    "2Eit2LFRqu2Mo33z3pYTJRHNCPYS33MrU9QgeNcRsF9359pYMahqnLvKsHwwH72C6WDSZRj7G7WC5heVyUEawcSLSx821iJXT4xWf2F5fjVWDUmvtxr3QSv1aLwThLXxeqYCCc34xjxZDPqPyNGYvWLNeBZxATvBeDuQ6pSiiRFknqmvYVsm9eH4Et3eRHCyxDJEoqZsAahwfVSya34dZNHmjaPQkwWo3Coc17pxiEnWuWmG38wSJz1awE6cymzhojnjxDTbbXgjR1yfYU3AU2v9zttnT8Gz3gUzZNSwjiXSPu3G9zkDaFZVKqb5QwTWY3Pp6SFJgBQfx3C3sp4a9d3n9c98pfWFWAGQN5EfkoHosF8BQTDuzXG3NU8gVCNeNPXYA8iWCbvY3XpxQMvQUxqkjDv9VQfUNvAKVHLW43chi2rdBrQ7Teu6NnesLRWUKXpzSxpByWftkCCdBppjZtYmhhCHqpQGkQyTcMRoP2krFKe7xKbfnFkdkhaYH9TTdKuTuKtGb265RXxiqrc34KvkZpaBBQB5UvoCU4iLSDngNTjqkNPnWekDahzNHLd6CtcdC1B19jdGEXWeNADemDtdK4zrMNg7U8iVpyGYhLDnkeLVrcbhoxkHxrFwfrN19XvitDosQqmt9dseR6SWHBCDZJdmJecCiEwd2wBiwN5N5umEy3Dd4Hznv7kDr6eX7KtYxp",
    "Ergo Watcher Reward Distributor",
  ],
  [
    "2Eit2LFRqu2Mo33z3pYTJRHNCPYS33MrU9QgeNcRsF9359pYMahqnLvKsHwwH72C6WDSZRj7G7WC5heVyUEawcSLSx821iJXT4xWf2F5fjVWDUpPyXf9D8PFkALkfhCu47xSApej3a8VHFCfLuQoMFV2LgTs6hEqRf2XQkDHzn3KYbGJ9b6gs2XcYf3ZQA2gJaWJXFErT11uifohMFFRJV7cb1eECubCbHCib3A434SJVrZee18QTRECrDirtC2GdZK6fiKGbGcKFTZWK4f3ChgnuZFCjRoCX2UquL25b2zkev34shFCspbYwYcyKmc5xxrvssUHgQmUZy7yu3RKJPXYuwH7SiittGsJ946spWJEp3cuBiMcpRvwbiCyrQqM1FtK3wZJKqy95bVDfj9zXwFfR1rE9wZADPs6xcJxi9P1z2iBXqPXGQHnKVaHJWEwNZfP2KAZeUi8etKnYSib68e5cuif3YNRVFdNtKAT2SJEsJCDmnUecmdCwvzMeH2EtNYsRBWVeTV4RBypRPi243qkFrct41bz6WZ8FhLFXU1tnExucXvQ48ZoQ4RQpNorEcGNDY8MC52yhkofS5b9wy6AYYjpQyTMmhD1QZF3VcQgPNT6x4yxPXYsjohYZh96h6M8T7m9gfVV3w8xowtVQVAB1kvJHMuZXxBkBNLwFbhxKuMwC2Dje3LZmuH9mhg94f7Uoe",
    "Ethereum Watcher Reward Distributor",
  ],
  [
    "2Eit2LFRqu2Mo33z3pYTJRHNCPYS33MrU9QgeNcRsF9359pYMahqnLvKsHwwH72C6WDSZRj7G7WC5heVyUEawcSLSx821iJXT4xWf2F5fjVWDUpyGNdkxhFwQMhPKpx85Uu16put68V837wxDx19LRJ5uqi7xBa7EDFRU79Grzk8HDrfpUF3qct4xrQUvDofDroRQTuKueAbwybAfGDhNqG3jzKQchgjedBkbPAuDuNunehW4ZXUBLRSfqy3xofV76bxT5zpZjZcKud4XaRQvXUAVGunJzAs7RNZD5WZxenhmKzhiyuzWiq5QkWqxFw2h9vQ6Dd5PdYsWP3dPtaDC8WUjGz8tQ1tU9LuhqZ8QThQA5zBfoPFrk2iJ1repUuwZPjWnDRHLfWppqDQJGm2GEWHmYTQAfCJQFChUtSNstSATxw37xXjziKkPQRRVPr3VPapbHtGSoQyygzTHgcjxv3HSzwXkD7DScyA2iGDsd4B4WeXo4a6nM4CYpxa9f9FvabbNByhKsgq3ZoCsbUVXN99Pet93MFdxVmBBEsGYEYvtmMEDZEGb5z3JZDtVSdudFcm3bij82bdFzKSmmxxWZhscmLYpGGq1J5geqTiyTCgsmksAHumPFBmLkz8v843Jc3z5b6dwFgyXuBmQPTq6Nf8t95y1UYe8UYx3qNVfrHSGbToSgvCQyLKVv5ns8T2SZRWWr",
    "Bitcoin Watcher Reward Distributor",
  ],
  [
    "2Eit2LFRqu2Mo33z3pYTJRHNCPYS33MrU9QgeNcRsF9359pYMahqnLvKsHwwH72C6WDSZRj7G7WC5heVyUEawcSLSx821iJXT4xWf2F5fjVWDUskGdVdyYY5RBJnp3dfYC7iPoRNeopAFQWFwEbTieow347UhRyqvo2LntFpXzomvGwVTfq9YXS8Z1GGW5mUEioD5xC17Sz72NLbQrskSx7QZAxQTbMGh6vwM9J4q7NzRmQeHmWaHLpUHMU4Jdd5ccKumMvAY8d5C8RxB4iATySLY2N1wY84qNsWNaqkNofbUebf6LgmU9HTKAmU3nDoBfX7mhCjH8kXDhZeYdRsuLVFEYu83TkpwgHAYGmUoemxWAeA2BKMx8CBAy9jxbCyUjdnk9i7sLxuejrwLLh8W4tP81YkESjZ8BV65BhzPdvCaiX8vBSorgFfnvGKVzwfhhsSDwLY1GUwLTMLwTUTjSzEjsMX9hzsEEEmhxLsekabLmK3HZ1jssLrFryNuE59uS51hazJsi3gsT8SBk1J9YV6Dq6xto28nLqrMqK6raqLcAm2iU8hBtqdoSXqWzsrZHpqc2uLGhY52ee4k9TpFBvN1RovYUtY6KS4FncT4UgnbEFkzsnWYKX3CDn16tJs5CyZ97gKcvUonZ5EqTwabzni14CcQsTtKtEAqj1odvSyfJ94NnEjuiVPC3VmZbQvveN3bQ",
    "Cardano Watcher Reward Distributor",
  ],
  ["9epEaQkSeCS5YkWXWEzo8NzCwrBazVKmaVtsxpGnmEyGV1WHPsD", "Team"],
  ["9feQDTTAJCzSEgSLb3mNf3NdBeU5janU1WQUF7Uq4cm5xuxdvvc", "Ergo Foundation"],
  ["9gJiLa23dcrwQ2AFouWpDWvk99HvmSwHMgimt1n7fWJava8pRVJ", "Treasury"],
  ["9gJyfXkgqbXpuL3jeiTza671Qb4nDugSFWzkzbwYx53g3xewWNY", "Liquidity"],
  ["9hBEAVZ9MHLf7mwVrvP3nqptdqYVdYGu1byPH8XFzC7KDuzrb8W", "LP Owner"],
  ["9hp3fH6LkT5tkKqrYUXX4J2D1TEYcBht62RhU6EXnSXCdrBH5jQ", "Network Fee"],
  ["9iHgXoqrq6mTqTeUUY6XQs1Ea6yjWsM8YdoipKDXzp5NJ6su3zM", "Assets Issuer"],
  ["9iNpx8hiFBBZVHBLRtZXV7MLdV7ME17f86YeESRd8DnpJtjVJZ2", "Staking"],
  [
    "ChTbcUHgBNqNMVjzV1dvCb2UDrX9nh6rGGcURCFEYXuH5ykKh7Ea3FvpFhHb9AnxXJkgAZ6WASN7Rdn7VMgkFaqP5Z5RWp84cDTmsZkhYrgAVGN7mjeLs8UxqUvRi2ArZbm35Xqk8Y88Uq2MJzmDVHLHzCYRGym8XPxFM4YEVxqzHSKYYDvaMLgKvoskFXKrvceAqEiyih26hjpekCmefiF1VmrPwwShrYYxgHLFCZdigw5JWKV4DmewuR1FH3oNtGoFok859SXeuRbpQfrTjHhGVfDsbXEo3GYP2imAh1APKyLEsG9LcE5WZnJV8eseQnYA8sACLDKZ8Tbpp9KUE7QZNFpnwGnkYx7eybbrCeFDFjTGpsBzaS6fRKrWj2J4Wy3TTyTU1F8iMCrHBF8inZPw9Kg9YEZuJMdXDFNtuaK15u86mF2s2Z5B1vdL5MtZfWThFLnixKds8ABEmGbe8n75Dym5Wv3pkEXQ6XPpaMjUxHfRJB3EfcoFM5nsZHWSTfbFBcHxSRnEiiU67cgJsBUpQn7FvEvqNLiKM4fL3yyykMtQ6RjAS8rhycszphvQa5qFrDHie4vPuTq8",
    "Watcher Collateral",
  ],
  [
    "HNJiaJVyw1qtkiuQYxDTjaA8rmogotVzADinCt5qqavoyoREWM27WAp6f9Y79meFcMoJLt3yr8nsWC5xU5474ojCxE7VweGpd9sLz79VrSiyu7zBjBXPjgGLFZdJAEJhsH8A4y924MVZa7D9te6t3FUiLcpyTbrvTBhD7SpnD6hUjbGszCEGf1fRX1SmWZikeXcJEkfej42dPRimT6Fw423XAc9Tbeih8ZW8x7f5Y7y8frF5kxEdw998JdLU6UzPSwhrDjfKhySqmssQeQxCFwb19PMCB8ZZtx2mGwczr2H12Yi3hnEWn9ArqRqKWip24pJgm6e4Ky7n7BzGRRTmDtcA2EGH3zEVzpRH6aNSHE1MJ51dbCZSNFnRJfk3vxenkSevCfvEMfn5KyQP9wPU5foZACuHX8TQXvVUe1va3HXJFwCm74gxRssBy61GcYdwVbtxykPrw3t6aDX7c46BejsXvEaz5Ydcu7U8MJCoYia9pZ6zkjAj8d7Su12DMK1aLkBxw4vY2zQYc",
    "Bridge Cold Wallet",
  ],
  [
    "HNJiaJVyw1qz5jgKrEemNwnJd2Mc5FJgsNTDMkMrx73pVyxcinng2m8cDyMktacXQjvBsvNoMxucxmme66RPeCAz9bV3fPFYPo4umKZVwkQosRktScyUvQ8o8PPe64K6fu5iFVCvMbjgi47q3CBQS42e9xDNa8xwVf35a6sL7sXMzDZVfgbo7S9F1ufKhDgC4nFuxucyJp1Q7TXQifbuorHEfACknKoXhyvS7ddHBXPFVdrDTWpi17HUsgZPZQGosjUjkHWHZRuBv8H73JwB3ifA2R8HSriN2xgNNZWE4sWYhvVdVQ6UiXxjD1yqKwABKg189v4chCgTFNd4qy6RVoMVJs17Fe1vxRN9eaMwAowi3ok1hLGjMSsinxKY8vHkRdXPTqLyUTDQVkZ8DrDfsbdoDYrqpybrUjsD6wBPGpqr13NqFbyW727FYwV8SoAnvDRbkcZ21EQ8u4HeYePgDdQMEMwqzqRUHgVY3evBtPfEELbQphjVTm1p5FkRcF5yuvREj72oG4xt3",
    "Bridge Fee",
  ],
  [
    "HNJiaJVyw1z7GmWFmy7YmwutB3rDGSMsGc81obWpaStTYhmvW6rKkQfJg8MZxbVqnv5Y63z4Au3FNEeB69jpz4rqa8PyAVmjcPdD3tHWePSYTfzWNgXAoyxAMdZ8ETcPiATVNMKCZK75r8jusU7sr4q7zCCt9L9hrfddaR1HcA7NdGsTPFdNQ68wEF2nuHQPpkAbvMg5WYNYXSD9VZwKLa9KnqtnoS1JqMwXJj3PdTzbncA7TGEXw1Z2k3SdMXyE3S4yDJcn49yt18r1eB51JGjMznbY3vSPsuKw5tQMvnCjssGLzjLgs54ZMqv1Hm84TpiPVfmjyCcuxoNeckufito7Ks46EmigKhteMXYHUWNBGoCHLh3x3wuJ7QnnspX9HqEub6t9J1pP7HQfDg8Wgioais1pCMVVSRmbq7hRjXhgHEkLeiixxh3XSb8hXkwbdi5JyDDVJ94jXLdRpZfG4rWjrwm5PLCF9sCENPxFrMEqWmQoj3MpMUzkZDEqjrvTgWyshbgwbqPCA",
    "Guard Rewards",
  ],
  [
    "LXwmG9jPiXvYd6Z1DWRazpc2wTdpW2awCB9NV5qjJx4UFoncqYxve6G1gzTVBNCsDwSu5ZPEi6LNLuPdzM1r9DUMgAzEfGghKeoGebPAyLCerZ8Us4ukQSJPj8j3TQY5JLZBwceKrx1KHjeRRQBwBgxTkfButyeLtHgMELArAC9DDaZbYg7o2t98LMUZyArDzmK5fmhdKgeo6Dw4oZ1ENbepgqG35kR2pS63heXUeEuhH4nvqfLGHwSTanzhsQeBmYH9iqxSFfCvoRFnasoEPkWAv6PwGURqUk23wS5J9CaSadgPYRNdB915Vjf2kvxxmPFwoW9Uq1ZRo5DDS49goU3YbMgDJPnekbGQ9u9jMcwvo8FGRMiJVyEy2zdncnqPUaipekDaDowgf8EKYxBRYPo93DGga9FCVAoMC2PzRXRN1Q4X2zCx9onwMPoTWu2nFjYdx58bqzqs2ToK4S7UXZw4vpt6oSam7XN2miAfSN8WJmYRJ3FSGNfUz1ryo6N8uoecwEGeFksvbkobAvykuDGzeCNgdeNnRnMFZrco3kPvdzMf75tsRJu5ZTpTMW5mJWm6NbPJwxgV5JdxUvHPd8SCCmFKxhFywqVifp6WRMMqfVKaBdmXWG7zzN6hJZhf9EHupjR4KZExmuShvpx5bA1YyMUz1MpE9VP7vkLJWDYXfpJHJEWFRiADfSHt2RE5LzepxScfoHfpE7C6e4TBQBZd3dndxWDRREZSV45A1iXdq14AYqcsoBJ5Y8JCGHzXaGCLiBHvsXFMfUdTHhbPA8cegddhhZ2tK29UhR3veSGcjVZ1YwzVthQeJZK8RMbbbdf2s3f7dr8a7YGLU31T2jjy4tPR26ZFSadcuuMFR6QQisRP7qBKpgmUJc68fWdwNsLr8FLW8q2yipH1YnsWG389BQ9aXM4Zfb2WmXUT6JCpaeABWUFCLv6w3BkuBHyUFmmfiiHNx1E9u1VEuibAJYEkC6BEuoCKDqxMV62wdjbahsAn4fZdpQyVMK6xADbY2FXrREeaq4KDGzY4XYVZxaEZs3CEeedoZjFLbBe7ysm4MWqCiK7tucARTFF4XaxoH1C5JqqiraqRm4HBGVcjfzcyMwMHUC15m2N4AoQycb97Dn8W4Qp7s7gmchThLotvP2E7t7CXDa21cwKdVx9nh2xTJRPaXzMjt49L4AbXqT9RJ9PeRsYzKcQLcgugdDoB3vDtFBTZeoNNvf43JFpapTozoQtSfj7iNrPYfaEkNvCEzLjqJVyMPZ7gt13aySy5jDPp2vF5hGd5f6yv21PAiwQtfV47hn7y5hZfKv4T3gDE4sD6UQ2HFmhrAXmcuZ4AtfZZXpC3vgw6vhraKUFsHKjLZU3WKKAwnPW1HJC61jiutpnaBK1hDhop6FHkjvNtGrSnti",
    "Old Cardano Permits",
  ],
  [
    "LXwmG9jPiXvYd6Z1DWRazpc2wTdpW2awCB9NV5qjJx4UFoncqYxve6G1gzTVBNCsDwSu5ZPEi6LNLuPdzM1r9DUMgAzEfGghKeoGebPAyLCerZ8Us4ukQSJPj8j3TQY5JLZDqS2BRcPkmovmt7SZCKD95zoNgsitrYdmv2JhoC8Wmq7aM3DpwmhejCZ59n1ZYCAL7LsKw4zX45tH3sGLXxmeBNCCkcT2yxiziEAn2C3ybXqqab7cMhkoNdRMwXpUUpk3489kfyTY7SjbUPqPKhkH9veUS6H4U7a4HaEi7tPyueHTbjjQZjCZd5uGi5tC7jMvrgjYqByUG9PA9oeXHj89RxK5TPbbmkmsZVHVtdBzfHiexJh32LMszDRHuUc6YfisZKx9kNSSzadBdLbJUGHeCd8XaBg6w3e1uUBQDghpx2z44C2GZbAmUQSUQ2jqY8BBwEhtaxzZ69NK3dEjTFgsZ1R3nkbhbAu5Xs5fabBWZo6RvaPf8jTKRwKaNgQZrL93QV2JEZoapbRHCdvzaHHpBLr1p6nkDg2kB3rUTj6kmaabxswG8bSLAA9qYZhDCyh1QdSyUnd9T2o7qHybaoeEuqG1kEWYon4741ut8HCqbwEjKze6rDuEbnPUYzSr7kiwoPeV2GrdsVFRLgxwgHJoENgjUhj1VVKZB2q7n8S6smwf7CJyYZZCZGkg5bLpywJddmegJjk2FuLwA2VEmnrDKRGpFkhxBc2rbj974XgGcBZ66mPTtwrXUwjY9G5hUArtYs8WhsCDAH58yaHFFViaAhBNDQ3HBtFbXwh6b1osdv8zDSvncYXPx2iikhmf6TRC2DE2ENYtzhLHJmgyXmQkm7yXp6nWxJaeLnUuxRaWdxxQSPy1Wnm1GvKJYzRBhv9RdcmDnEgKs21ex5uSSdqJ4H53Qs6StxGyQ4HyjTjEVUxTbUZpnzvECgAufKkuSPyC2mYkKKGrzWmvv5sh6fyo4eAq9QnfXB9YMETMpJbx5dFpc6ZXYimSCfJbJfP1bpCe1hXkhTPWeZJ9aPX6HZEfu89ChZiX32MaSM3QnnUhRbSnzdQ2jVAtqqwjNN5SeNNvXNxS6B1UHj52TGvGrLnNUp4BWgNKAAwpBxAAB7wny9tUSXt6jHVnGHBG1vJWF7S9DeaVjKg3qR8j1bUsGqh9bVkarag4SREopK8cHwFpb2yFcdGERfaKHyekAUjVkhqySH3Vb8GiAdDbRArKV2ip4eveocsFwjoCD5i9rotksNysgi9RDjkApYm7aJegC79omCujHVYFpU6HtV2AhNVFRvVBG2xDW9YEKEm3RxrjoCttM6sFkbNX61CSiQ3LsBPvcd5Aix9NUESjbNxFwARZ75UgquvFddApn13yxSqfzVoE9L3eRnAMxd7KHudBWQsnDK",
    "Old Ergo Permits",
  ],
  [
    "NY4PEzZ7VfjqPk9gZSNS6ERoYyYBEBebyeXUPs1sjEfdenV3Kq1QKWBSQ1Gfem47fPVRw5UXcYNXtgXNGqsD4DedukcYv5c5kviu94yWpyrh2tbXHea1tyfuEcb8njgvXkAxrXkjvgcPEQqy7BsR3KQPe8vzSaBG5V8WFHQqvHmpMXXYMvKDZzRbNjZUgYvVinGq6qx9hct1fFG15nFdcWZkzhBcu8ytydt3MmnkYEyL4L2rLD8Jp2Q16DfeaBBqmuyxpMoVxPrQzbPjq5GKTKrqnpisWVrubpAy5dg1oQ6tVZompLpwTWvX1xWspA9tWPmc3MCV2e6y313KzSosGLi2Sdv2ptDgJpKamQv6fNKmj3TWkNbPCDfjp2KXYcfYE1vQ5prRZCPCDhVgWP7bqpF3SeUTMJmvBaXjd1tBavjanquQDkYU4n5XBwJPvUa5kCAP1USTgP4cgPA6SzB8hg2RXmB4PmEWM2RWv2mrirYeTdZrzXCbpGCd9B9GK7bNknnYz1X8wVqyYxxQMZ7Rort4BVRNPNKzEMtdGKSmQpiWitfoAfphXL3SGMfwMT3sspgDcD93Ftiq9gf6kgawpFBKWJmV5jXmfiSCWkPW5x56L5hcc3NwJLYYjcMh81aXQBP4HguyudttZcF8QiDa6Ae3idS1BTegArbhZBFn1TQJGgWtuCubLC5Ja71FadEN1G1s4Uz4BapDu3WpNH4NJn3UeWavLd1EytGjevyJu8XjziAMYr6cPZsyhb95aj7LAHgwJ8YT42zWYoDxqhEzbuderVtfauVJxEo2Rt7p83hMtkFS8Dy3vNbdmGEhWEFfDEyquEHTLsYkehRMWTeTeoDpRhKpeXoDxTNriR6Fz6y3Koxwzg281gYhxxvew7TpvSa3cLvjBpNxuoUfhyT645u51cBsQzden3RB5LjJeToSctrx74nNGCm9sR7fQgzno2pETeit1mykq4eocy93EoTcypKitcbfhgAYwXrGcGUQyhsupFgPZMnms5VnWhCsGKkK93uy7z4BRgi9y2aU7zMUxPJN6q3kYhjcdgYhcgqLLmWo5pBRSxcuq3p3NhPnd2Tps5RztjtUS5ZkbRVsTri8Sy2J5xPLir6VB7uxcPCSYYGJaaVfENJ8tYLYH3m3TUoxRipyjNDDBmsRdujqFQvFoYiCyaPFgu9iqzMvuPDM7FDPAKV8V7A895N9SMMZkG7uAzVvLgrU8Wrxdby2CAX9ttmPJn",
    "Cardano Permits",
  ],
  [
    "NY4PEzZ7VfjtnTN697R7my9uAVkCYb6N71J2RSmJCFSdDqVf9aPvFQqKXujYDBtSA8hxYVUgkGgU9SP2Ss7JDUkHkdGLBqZwH4yDcPyVvbVbcre3o7nR59wiFDVtjzCjfZmVvMVJD9HiW4GKqVuZGTQCKns8tDe3sJoDNTL3VmhzRUPZf9JCN4TNji1ruXf5CxqWtDrCfoxE4xfbRWGmtBMdLMoRdL85V7z1fP5KxroWX5YgZQo28nTCU3WjPuY2YrjqYYGNHXvFZ9G8E85kCcseNtRWqViXGFzmwqHWKaYe4AdJzBbMKzJWYszsbiemNvisPtT2Yj3FjAmAErpW3gMeWyH3WtbipaAu9D31ggpLeLkLTGscJ9HB2oExpGWvv6u9mGdkTJMHYUuZJUGrcJPE3m7ZTEFxwkbeR9oD8nHHgW4SB46kHFbxzNoUksGPZQnxf95J3e5PUnhYgg7mrQLNpq6pphgGukFcHDgAN2rgFmUSDVsuzomhP735SMiveXSPzx6PZeP7CmrEHyXN6mFbBJuY17kvzzix1w9eFwryZDuZqnAANkYhF3TLkLyGZfSC4o9iAGynpivuNMUgbKAuj6D116tKoCq9PHELL8eTefmXNLFuhauQuKRjmWQKj9zYSd7qi6Zf49KX25PnWHkC3REc4abYpjtiQFefT2HkWRwneTCkJ8uMvoHs6kJzLg8NVzH8XwEZhTM2tNSDhBKZaURpYiQcHwLDgv5uFiwhasLAdZi2EJywBYX51NKc6m4MEsTiAJC9jkEydWcwyDzSHN18yEr4rvEgMNkUhLHJokgV2v3BNFhUTJqe58e2QXAmx9MytUDqzg3vwexEpMhueC2roYA27P1mmb85HKEz15a8LnuUT8ZjmG8kDbHuPYFyxcATytVuDrFDzqKBt9X36bocip4ZU4RRY8JcWjJvMcrBCjV3EhDVQ4it8bhoZnn79PsXazvDteua1NEYEJniPnNrRaiKTUWrseEUQ2vVjWy134jMxRbeiARhoj7MDxug2kFP8jRGSsxWt3Qqbv2SezT3xZ8jYxTyQ2CiyJ61CvUQwPtmoY3XKjrgrJKwnSzJRs4egKPYZKoSiSy6UdHMKuNDmys8wYo3Gi2EgVdUYRLLWcHh5Z2H91odSbTW2h5e6pZeY4a45TgihE6ZnZBhHGc75zJjukhPgP1wEp8GrreHA7ejvTEmpwNgj571x5JrvRD5TxWaFuZKBonGexovAK2L5v",
    "Bitcoin Permits",
  ],
  [
    "NY4PEzZ7Vfju59RSazdQK92s7PaLrnCh5D9yZBZx7fptQjQZ7Ra2Xiz1PFusrkij3YamVoqXNqoUzazpjnzwmX4zKvPwWGLdqk1RXvp82m7Km2nwtvL2d6tVVCfgiVzA392JszEtNDh9hNXn6wk8eXjXwUg1q1w4UJi6XzmscSH6iZ1BR6ghCp5fyrZBeUfnvbPsfgHmmoVQzmDJ5E9KjmCg53detrDH29gyZUKyqjC5ddnCKG5cvVmoZ7D2ix9KFa9RuLcpVTxnVnuoJnHL1yoGog11TB3eT5hRyiUzeBU688pMb1xyUaCw8bjh5wSsBRAWQnDiAaGuj6zsJEnKeMW94XLeaTASw4K2bwyWHr4BVN9XNSeopFoj6mXPrD2ZhGgPV4HeQp1qEQ2pemMiSecXYkghfnk1t8hnfDNMfXoyKXxEmN8Cf1p7M8pqtgo7H9uUi6xsfotsB2uHVSoT21nzERYMaej9YuYwgC2iUzrzeZNFu7LbMqBErDgHn4wfgppRnF6axDca7QJGNv3q7E2q1DGRpzmTXPfr9FeFxki9geAwsTAy1KTqU2u6TY2wcRC3GzQz83x6LatZLhf9HZnVWZ3SRWQ5AmKUfxhHVxVC9Hwiraqb7ciZBsrnXHWmFaHHHYxafZwoLUBqxeWnHNM211MUwJ2rD9pvrqREfYs4CKYJNDxe5nezL11TnsLyt6p6XkKgHXvvqnk9HQ27pMbpNVX33Y8iQpznFvL2YBCn6Dw9hBDgb8thcYkkAXyLRZskEmhXQFL9evXTstNoeJVJp7NAo7dejZRaKHzTvZnZpkybJGks44qFbGSuSXGegN1V1HWyYGnGSgEJm3yrapNC5tdTvHWXVDxjw1G2TwqKL8D4HZVsyWsu8PEErsaf593jscXKTRn2uqvdhp29rJKGV4v2Cfd8DDXzwhmVxcVFyUiXg9JDe8fCi2rxmFai7a6P6vTJrUkJRtKYBt5RUY3uzKXpX4J4fBWMHmnM2yTSgdaXb9MYULmsbWitqpxiTWh1iMQdXNHxU1A2hHvsqogqEhrG9bGmMU1m1EFSFAPocv3KUf5bPYUWmVUFaxa2MLmE4fs1EC3kCJz8434NrxD1YVA1iosiv5f2tDM8E3w15VRik2a3R1Y6C1D9uHAAT1XK1A27dnx6e586eghm5BuvCY9Di89bdYH5KX3sg4NzWAAJYd5DLZbtdXxzRrKiKwMcPjskhwyQRcv3qstVzPDfJdE8Ej",
    "Ethereum Permits",
  ],
  [
    "NY4PEzZ7Vfjvo3AYu7dBh4ziatarsMAVPnwtHZL6BfoKeaots7P629HvVAmDZNdiVNUitWMqVJhgphUregwCXnhVNRddztP93qbtSWCMzVk1UQmCVUpvQyb25nyH1PrpRSjpFewJWeN3bjiVF6bTAm2t11X4d2fKGnAo3PX2BFVeyAUre7T5CZs2uikxZisyrJ1djE4UY1uwpTFkJv3RzZ3JMugNDeicf7qWqtCtNH8E9uG56VD2dMvmsr5YHQbrKgxa5foyA4K8cD59o2ub9ezbhjSgfXbc6VLaXmp5SzdP6n61MaePNexedifBWwAsHFcaaVXf7oUkePp5dDpc5mBbaAuidBAwH4SaxnUNjPw2bHVSXEk3ZJwwBrZRG7CYBCvEN6wFuPyzuhGsJQwdCtvUqxViGhxWrhRYKwixLhScVdGwCFCF9HjuCXt92FkEZKRk1kJuNzMUuc9AUbafbwhi8RC96TVQrtnsajhomptLKFmQXg4nZQao3jwHV8kfZeyF9BX5kiWUnC83Wa7X7seGUcECHRPLAapk7Lr1kUQ6Q62RpBKeGUsfmPcyNhaZ2bmdxMxxHAhdZdKVr78R5ch2BvG7ZtV6wkHB1hcVJGJmU4dskPPR5EFd8gED72eeUnNAsTknW7ePfNMj4DYWGqf2QhPHDZXsyRN2Mczv4tgyRsNA2HR3U9oZikejcuYhha9yNsXEdNn23B8wa5aDZwR6hwZ9hQ74yv29sbfBAfe9XWT2UZAVaeZeazQSSrvAhicEKnwmCAvfwcZNS57SHJ1EfZf1oEt66S6mGFdBzcKPLZzmJmCgMiBmMThqMemT1XS1ovES76LVcpXSkyiEdA17htR5HuPWdDVfWNQAK2jAM8BjKGtvsh93oMFGvMaBVBAvj1QcfTr17LdeeT7h78bKzyF5SQWuyu46xtDbmTZVrR1ZSpnffiD8TbWnae85Bw1VfttScQ8yfa26dsc9pwLrHhYhC4XKEVPWYUxLHZd959tLA2kGNkJBJR8PPThR8PugaUTq1sQpLg4ezPPUjYyWFvhFf6Rcw5rcJAwj99AUwoEhPaUnxT3TxiEJBbD3Zsna33mQD9Zg69Zzr9xiLA7GzhhA998dwkpbbgqFxyASwH6yav5qDbXPZH7GPtt3nTjUfRs87SGYgVGHoGhqaVUAfQKW4TtvFicdpvQws5kg1nZthd7WkWcR7HqLc1R4wBPFynFVGc457vhQwaP78yQsQDHq86",
    "Ergo Permits",
  ],
  [
    "USNVj4qoyg7U7C6EpdFGHNzicn48yVmMtDrGYvJMSNjVZF4nforamWoWCMttwKetR58XFDuCvzGdUm2FhzuRvq1MMjBvCfNvAmfBruJ6fuvpCQPmWL7wMndaPvuqW2YFAkrkt6X19YjwLukdV9DToWjcHonvQEiLtJokFGrei9ksNLG3dm3jWFyEGa8AViY5CKcKz7ibH45ZwZ6LGPLfy2GQbTYRUyemWbfjGCy8gdxEspymwCgVtpci1yHbeGs5BHye9snAwyDN16vTNm719EfSQqgu4zKDR99tnbhT12b8FPvwZkRfSwwyL4ghau6i4jzcA9Ghi8tA6Bgi6gEPJEnPSSteF9d6kabuUnbZmmA81QYeZUEToFhCWncjBViwfcYYnFsxcJvxnB4DVtD2oQDZr5z5TRywDWKD6YjnxwLqwF2TFbrbDLdQzu6ayJzAcPYpLxCThQ2EAMwkz8YP4EXCE2rU2ZqjJXgRbpE1",
    "Watcher Reward Emission",
  ],
  [
    "nB3L2PD3J4rMmyGk7nnNdESpPXxhPRQ4t1chF8LTXtceMQjKCEgL2pFjPY6cehGjyEFZyHEomBTFXZyqfonvxDozrTtK5JzatD8SdmcPeJNWPvdRb5UxEMXE4WQtpAFzt2veT8Z6bmoWN",
    "Bridge Hot Wallet",
  ],
]);
