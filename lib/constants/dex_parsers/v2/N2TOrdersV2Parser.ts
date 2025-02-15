import { toAssetErg, toHex } from "@/lib/utils";
import { ErgoDexContractTemplates } from "../../ErgoDex";
import {
  CFMMOrderParser,
  Deposit,
  ErgoBoxStub,
  Redeem,
  Swap,
  SwapMultiAddress,
} from "../Types";

export class N2TOrdersV2Parser extends CFMMOrderParser {
  deposit(_: ErgoBoxStub): Deposit | undefined {
    return undefined;
  }
  redeem(_: ErgoBoxStub): Redeem | undefined {
    return undefined;
  }
  swap(box: ErgoBoxStub): Swap | undefined {
    if (
      ErgoDexContractTemplates.get(box.template) ===
      "N2T Swap Sell Multiaddress V2"
    ) {
      const poolId = box.parseBytes(8);
      const maxMinerFee = box.parseLong(23);
      const baseAmount = box.parseLong(18);
      const outId = box.parseBytes(10);
      const minOutAmount = box.parseLong(11);
      const dexFeePerTokenNum = box.parseLong(12);
      const dexFeePerTokenDenom = box.parseLong(13);
      const redeemer = box.parseBytes(9);
      if (
        poolId &&
        maxMinerFee &&
        baseAmount &&
        outId &&
        minOutAmount &&
        dexFeePerTokenNum &&
        dexFeePerTokenDenom &&
        redeemer
      )
        return new SwapMultiAddress(
          box.id,
          toHex(poolId),
          maxMinerFee,
          toHex(redeemer),
          toAssetErg(baseAmount),
          { tokenId: toHex(outId), amount: minOutAmount },
          dexFeePerTokenNum,
          dexFeePerTokenDenom,
        );
    }
    if (
      ErgoDexContractTemplates.get(box.template) ===
      "N2T Swap Buy Multiaddress V2"
    ) {
      const poolId = box.parseBytes(9);
      const maxMinerFee = box.parseLong(20);
      const inAmount = box.assets[0];
      const minOutAmount = box.parseLong(11);
      const dexFeePerTokenDenom = box.parseLong(5);
      const dexFeePerTokenDiff = box.parseLong(6);
      const redeemer = box.parseBytes(10);
      if (
        poolId &&
        maxMinerFee &&
        inAmount &&
        minOutAmount &&
        dexFeePerTokenDenom &&
        dexFeePerTokenDiff &&
        redeemer
      )
        return new SwapMultiAddress(
          box.id,
          toHex(poolId),
          maxMinerFee,
          toHex(redeemer),
          inAmount,
          toAssetErg(minOutAmount),
          dexFeePerTokenDenom - dexFeePerTokenDiff,
          dexFeePerTokenDenom,
        );
    }
    return undefined;
  }
}
