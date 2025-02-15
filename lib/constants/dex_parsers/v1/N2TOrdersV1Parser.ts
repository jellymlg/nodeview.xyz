import { toAssetErg, toHex } from "@/lib/utils";
import { ErgoDexContractTemplates } from "../../ErgoDex";
import {
  CFMMOrderParser,
  Deposit,
  DepositErgFee,
  ErgoBoxStub,
  Redeem,
  RedeemErgFee,
  Swap,
  SwapP2Pk,
} from "../Types";

export class N2TOrdersV1Parser extends CFMMOrderParser {
  deposit(box: ErgoBoxStub): Deposit | undefined {
    if (ErgoDexContractTemplates.get(box.template) === "N2T Deposit V1") {
      const poolId = box.parseBytes(12);
      const maxMinerFee = box.parseLong(22);
      const inX = box.parseLong(16);
      const inY = box.assets[0];
      const dexFee = box.parseLong(15);
      const redeemer = box.parsePk(0);
      if (poolId && maxMinerFee && inX && inY && dexFee && redeemer)
        return new DepositErgFee(
          box.id,
          toHex(poolId),
          maxMinerFee,
          redeemer,
          toAssetErg(inX),
          inY,
          dexFee,
        );
    }
    return undefined;
  }
  redeem(box: ErgoBoxStub): Redeem | undefined {
    if (ErgoDexContractTemplates.get(box.template) === "N2T Redeem V1") {
      const poolId = box.parseBytes(11);
      const maxMinerFee = box.parseLong(16);
      const inLP = box.assets[0];
      const dexFee = box.parseLong(12);
      const redeemer = box.parsePk(0);
      if (poolId && maxMinerFee && inLP && dexFee && redeemer)
        return new RedeemErgFee(
          box.id,
          toHex(poolId),
          maxMinerFee,
          redeemer,
          inLP,
          dexFee,
        );
    }
    return undefined;
  }
  swap(box: ErgoBoxStub): Swap | undefined {
    if (ErgoDexContractTemplates.get(box.template) === "N2T Swap Sell V1") {
      const poolId = box.parseBytes(8);
      const maxMinerFee = box.parseLong(22);
      const baseAmount = box.parseLong(2);
      const outId = box.parseBytes(9);
      const minOutAmount = box.parseLong(10);
      const dexFeePerTokenNum = box.parseLong(11);
      const dexFeePerTokenDenom = box.parseLong(12);
      const redeemer = box.parsePk(0);
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
        return new SwapP2Pk(
          box.id,
          toHex(poolId),
          maxMinerFee,
          redeemer,
          toAssetErg(baseAmount),
          { tokenId: toHex(outId), amount: minOutAmount },
          dexFeePerTokenNum,
          dexFeePerTokenDenom,
        );
    }
    if (ErgoDexContractTemplates.get(box.template) === "N2T Swap Buy V1") {
      const poolId = box.parseBytes(9);
      const maxMinerFee = box.parseLong(19);
      const inAmount = box.assets[0];
      const minOutAmount = box.parseLong(10);
      const dexFeePerTokenDenom = box.parseLong(5);
      const dexFeePerTokenNumDiff = box.parseLong(6);
      const redeemer = box.parsePk(0);
      if (
        poolId &&
        maxMinerFee &&
        inAmount &&
        minOutAmount &&
        dexFeePerTokenDenom &&
        dexFeePerTokenNumDiff &&
        redeemer
      )
        return new SwapP2Pk(
          box.id,
          toHex(poolId),
          maxMinerFee,
          redeemer,
          inAmount,
          toAssetErg(minOutAmount),
          dexFeePerTokenDenom - dexFeePerTokenNumDiff,
          dexFeePerTokenDenom,
        );
    }
    return undefined;
  }
}
