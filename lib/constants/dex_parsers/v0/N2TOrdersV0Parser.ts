import { toAssetErg, toHex } from "@/lib/utils";
import { ErgoDexContractTemplates } from "../../ErgoDex";
import {
  CFMMOrderParser,
  Deposit,
  DepositErgFee,
  ErgoBoxStub,
  MINER_FEE,
  Redeem,
  RedeemErgFee,
  Swap,
  SwapP2Pk,
} from "../Types";

export class N2TOrdersV0Parser extends CFMMOrderParser {
  deposit(box: ErgoBoxStub): Deposit | undefined {
    if (
      ErgoDexContractTemplates.get(box.template) === "N2T Deposit V0 (legacy)"
    ) {
      const poolId = box.parseBytes(9);
      const inX = box.parseLong(11);
      const inY = box.assets[1];
      const dexFee = box.parseLong(11);
      const redeemer = box.parsePk(0);
      if (poolId && inX && inY && dexFee && redeemer)
        return new DepositErgFee(
          box.id,
          toHex(poolId),
          MINER_FEE,
          redeemer,
          toAssetErg(inX),
          inY,
          dexFee,
        );
    }
    if (
      ErgoDexContractTemplates.get(box.template) === "N2T Deposit V1 (legacy)"
    ) {
      const poolId = box.parseBytes(12);
      const inX = box.parseLong(16);
      const inY = box.assets[0];
      const dexFee = box.parseLong(15);
      const redeemer = box.parsePk(0);
      if (poolId && inX && inY && dexFee && redeemer)
        return new DepositErgFee(
          box.id,
          toHex(poolId),
          MINER_FEE,
          redeemer,
          toAssetErg(inX),
          inY,
          dexFee,
        );
    }
    return undefined;
  }
  redeem(box: ErgoBoxStub): Redeem | undefined {
    if (
      ErgoDexContractTemplates.get(box.template) === "N2T Redeem V0 (legacy)"
    ) {
      const poolId = box.parseBytes(11);
      const inLP = box.assets[0];
      const dexFee = box.parseLong(12);
      const redeemer = box.parsePk(0);
      if (poolId && inLP && dexFee && redeemer)
        return new RedeemErgFee(
          box.id,
          toHex(poolId),
          MINER_FEE,
          redeemer,
          inLP,
          dexFee,
        );
    }
    return undefined;
  }
  swap(box: ErgoBoxStub): Swap | undefined {
    if (
      ErgoDexContractTemplates.get(box.template) === "N2T Swap Sell V0 (legacy)"
    ) {
      const poolId = box.parseBytes(8);
      const baseAmount = box.parseLong(2);
      const outId = box.parseBytes(9);
      const minOutAmount = box.parseLong(10);
      const dexFeePerTokenNum = box.parseLong(11);
      const dexFeePerTokenDenom = box.parseLong(12);
      const redeemer = box.parsePk(0);
      if (
        poolId &&
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
          MINER_FEE,
          redeemer,
          toAssetErg(baseAmount),
          { tokenId: toHex(outId), amount: minOutAmount },
          dexFeePerTokenNum,
          dexFeePerTokenDenom,
        );
    }
    if (
      ErgoDexContractTemplates.get(box.template) === "N2T Swap Buy V0 (legacy)"
    ) {
      const poolId = box.parseBytes(9);
      const inAmount = box.assets[0];
      const minOutAmount = box.parseLong(10);
      const dexFeePerTokenDenom = box.parseLong(5);
      const dexFeePerTokenNumDiff = box.parseLong(6);
      const redeemer = box.parsePk(0);
      if (
        poolId &&
        inAmount &&
        minOutAmount &&
        dexFeePerTokenDenom &&
        dexFeePerTokenNumDiff &&
        redeemer
      )
        return new SwapP2Pk(
          box.id,
          toHex(poolId),
          MINER_FEE,
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
