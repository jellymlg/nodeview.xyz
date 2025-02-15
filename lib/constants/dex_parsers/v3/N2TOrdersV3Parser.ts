import { toAssetErg, toHex } from "@/lib/utils";
import { ErgoDexContractTemplates } from "../../ErgoDex";
import {
  CFMMOrderParser,
  Deposit,
  DepositTokenFee,
  ErgoBoxStub,
  Redeem,
  RedeemTokenFee,
  SPF,
  Swap,
  SwapTokenFee,
} from "../Types";

export class N2TOrdersV3Parser extends CFMMOrderParser {
  deposit(box: ErgoBoxStub): Deposit | undefined {
    if (ErgoDexContractTemplates.get(box.template) === "N2T Deposit V3") {
      const poolId = box.parseBytes(12);
      const maxMinerFee = box.parseLong(21);
      const selfX = box.parseLong(1);
      const selfYAmount = box.parseLong(9);
      const selfYBoxAmount = box.assets[0];
      const redeemer = box.parseBytes(13);
      if (
        poolId &&
        maxMinerFee &&
        selfX &&
        selfYAmount &&
        selfYBoxAmount &&
        redeemer
      ) {
        const dexFee =
          selfYBoxAmount.tokenId == SPF
            ? selfYBoxAmount.amount - selfYAmount!
            : (box.assets.find((x) => x.tokenId == SPF)?.amount as number);
        return new DepositTokenFee(
          box.id,
          toHex(poolId),
          maxMinerFee,
          toHex(redeemer),
          toAssetErg(selfX),
          { tokenId: selfYBoxAmount.tokenId, amount: selfYAmount },
          dexFee,
        );
      }
    }
    return undefined;
  }
  redeem(box: ErgoBoxStub): Redeem | undefined {
    if (ErgoDexContractTemplates.get(box.template) === "N2T Redeem V3") {
      const poolId = box.parseBytes(11);
      const maxMinerFee = box.parseLong(16);
      const inLP = box.assets[0];
      const dexFee = box.assets[1];
      const redeemer = box.parseBytes(12);
      if (poolId && maxMinerFee && inLP && dexFee && redeemer)
        return new RedeemTokenFee(
          box.id,
          toHex(poolId),
          maxMinerFee,
          toHex(redeemer),
          inLP,
          dexFee.amount,
        );
    }
    return undefined;
  }
  swap(box: ErgoBoxStub): Swap | undefined {
    if (ErgoDexContractTemplates.get(box.template) === "N2T Swap Sell V3") {
      const baseAmount = box.parseLong(3);
      const poolId = box.parseBytes(13);
      const maxMinerFee = box.parseLong(31);
      const outId = box.parseBytes(15);
      const minOutAmount = box.parseLong(16);
      const dexFeePerTokenDenom = box.parseLong(1);
      const dexFeePerTokenNumDiff = box.parseLong(2);
      const redeemer = box.parseBytes(14);
      const reserveExFee = box.parseLong(11);
      if (
        baseAmount &&
        poolId &&
        maxMinerFee &&
        outId &&
        minOutAmount &&
        dexFeePerTokenDenom &&
        dexFeePerTokenNumDiff &&
        redeemer &&
        reserveExFee
      )
        return new SwapTokenFee(
          box.id,
          toHex(poolId),
          maxMinerFee,
          toHex(redeemer),
          toAssetErg(baseAmount),
          { tokenId: toHex(outId), amount: minOutAmount },
          dexFeePerTokenDenom - dexFeePerTokenNumDiff,
          dexFeePerTokenDenom,
          reserveExFee,
        );
    }
    if (ErgoDexContractTemplates.get(box.template) === "N2T Swap Buy V3") {
      const poolId = box.parseBytes(11);
      const maxMinerFee = box.parseLong(24);
      const inAmount = box.parseLong(1);
      const minQuoteAmount = box.parseLong(13);
      const dexFeePerTokenDenom = box.parseLong(8);
      const dexFeePerTokenNum = box.parseLong(9);
      const reserveExFee = box.parseLong(7);
      const redeemer = box.parseBytes(12);
      if (
        poolId &&
        maxMinerFee &&
        inAmount &&
        minQuoteAmount &&
        dexFeePerTokenDenom &&
        dexFeePerTokenNum &&
        reserveExFee &&
        redeemer
      )
        return new SwapTokenFee(
          box.id,
          toHex(poolId),
          maxMinerFee,
          toHex(redeemer),
          { tokenId: box.assets[0].tokenId, amount: inAmount },
          toAssetErg(minQuoteAmount),
          dexFeePerTokenNum,
          dexFeePerTokenDenom,
          reserveExFee,
        );
    }
    return undefined;
  }
}
