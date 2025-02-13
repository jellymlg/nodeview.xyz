import { IndexedErgoBox } from "../ergo-api";
import { RustModule } from "../wasm";

export const SigmaUSDBank: string =
  "MUbV38YgqHy7XbsoXWF5z7EZm524Ybdwe5p9WDrbhruZRtehkRPT92imXer2eTkjwPDfboa1pR3zb3deVKVq3H7Xt98qcTqLuSBSbHb7izzo5jphEpcnqyKJ2xhmpNPVvmtbdJNdvdopPrHHDBbAGGeW7XYTQwEeoRfosXzcDtiGgw97b2aqjTsNFmZk7khBEQywjYfmoDc9nUCJMZ3vbSspnYo3LarLe55mh2Np8MNJqUN9APA6XkhZCrTTDRZb1B4krgFY1sVMswg2ceqguZRvC9pqt3tUUxmSnB24N6dowfVJKhLXwHPbrkHViBv1AKAJTmEaQW2DN1fRmD9ypXxZk8GXmYtxTtrj3BiunQ4qzUCu1eGzxSREjpkFSi2ATLSSDqUwxtRz639sHM6Lav4axoJNPCHbY8pvuBKUxgnGRex8LEGM8DeEJwaJCaoy8dBw9Lz49nq5mSsXLeoC4xpTUmp47Bh7GAZtwkaNreCu74m9rcZ8Di4w1cmdsiK1NWuDh9pJ2Bv7u3EfcurHFVqCkT3P86JUbKnXeNxCypfrWsFuYNKYqmjsix82g9vWcGMmAcu5nagxD4iET86iE2tMMfZZ5vqZNvntQswJyQqv2Wc6MTh4jQx1q2qJZCQe4QdEK63meTGbZNNKMctHQbp3gRkZYNrBtxQyVtNLR8xEY8zGp85GeQKbb37vqLXxRpGiigAdMe3XZA4hhYPmAAU5hpSMYaRAjtvvMT3bNiHRACGrfjvSsEG9G2zY5in2YWz5X9zXQLGTYRsQ4uNFkYoQRCBdjNxGv6R58Xq74zCgt19TxYZ87gPWxkXpWwTaHogG1eps8WXt8QzwJ9rVx6Vu9a5GjtcGsQxHovWmYixgBU8X9fPNJ9UQhYyAWbjtRSuVBtDAmoV1gCBEPwnYVP5GCGhCocbwoYhZkZjFZy6ws4uxVLid3FxuvhWvQrVEDYp7WRvGXbNdCbcSXnbeTrPMey1WPaXX";

export interface SigmaUSDSwap {
  inType: string;
  outType: string;
  inAmount: number;
  outAmount: number;
}

export function isSigmaUSDSwap(
  input0: IndexedErgoBox,
  output0: IndexedErgoBox,
): SigmaUSDSwap | undefined {
  if (input0.address !== SigmaUSDBank || output0.address !== SigmaUSDBank)
    return undefined;
  const inUSD = RustModule.SigmaRust.Constant.decode_from_base16(
    input0.additionalRegisters["R4"],
  )
    .to_i64()
    .as_num();
  const inRSV = RustModule.SigmaRust.Constant.decode_from_base16(
    input0.additionalRegisters["R5"],
  )
    .to_i64()
    .as_num();
  const outUSD = RustModule.SigmaRust.Constant.decode_from_base16(
    output0.additionalRegisters["R4"],
  )
    .to_i64()
    .as_num();
  const outRSV = RustModule.SigmaRust.Constant.decode_from_base16(
    output0.additionalRegisters["R5"],
  )
    .to_i64()
    .as_num();
  if (inUSD > outUSD)
    return {
      inType: "SigUSD",
      outType: "ERG",
      inAmount: inUSD - outUSD,
      outAmount: input0.value - output0.value,
    };
  if (inUSD < outUSD)
    return {
      inType: "ERG",
      outType: "SigUSD",
      inAmount: output0.value - input0.value,
      outAmount: outUSD - inUSD,
    };
  if (inRSV > outRSV)
    return {
      inType: "SigRSV",
      outType: "ERG",
      inAmount: inRSV - outRSV,
      outAmount: input0.value - output0.value,
    };
  if (inRSV < outRSV)
    return {
      inType: "ERG",
      outType: "SigRSV",
      inAmount: output0.value - input0.value,
      outAmount: outRSV - inRSV,
    };
  return undefined;
}
