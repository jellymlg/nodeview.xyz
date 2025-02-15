import { toHex } from "@/lib/utils";
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

export class T2TOrdersV3Parser extends CFMMOrderParser {
  deposit(box: ErgoBoxStub): Deposit | undefined {
    if (ErgoDexContractTemplates.get(box.template) === "T2T Deposit V3") {
      const poolId = box.parseBytes(13);
      const maxMinerFee = box.parseLong(24);
      const selfX = box.parseLong(8);
      const selfY = box.parseLong(10);
      const inX = box.assets[0];
      const inY = box.assets[1];
      const redeemer = box.parseBytes(14);
      if (poolId && maxMinerFee && selfX && selfY && inX && inY && redeemer) {
        const dexFee =
          inX.tokenId == SPF
            ? inX.amount - selfX
            : inY.tokenId == SPF
              ? inY.amount - selfY
              : (box.assets.find((x) => x.tokenId == SPF)?.amount as number);
        return new DepositTokenFee(
          box.id,
          toHex(poolId),
          maxMinerFee,
          toHex(redeemer),
          inX,
          inY,
          dexFee,
        );
      }
    }
    return undefined;
  }
  redeem(box: ErgoBoxStub): Redeem | undefined {
    if (ErgoDexContractTemplates.get(box.template) === "T2T Redeem V3") {
      const poolId = box.parseBytes(13);
      const maxMinerFee = box.parseLong(18);
      const inLP = box.assets[0];
      const dexFee = box.assets[1];
      const redeemer = box.parseBytes(14);
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
    if (ErgoDexContractTemplates.get(box.template) === "T2T Swap V3") {
      const poolId = box.parseBytes(18);
      const maxMinerFee = box.parseLong(33);
      const maxExFee = box.parseLong(12);
      const baseAmount = box.parseLong(3);
      const inAmount = box.assets[0];
      const outId = box.parseBytes(1);
      const minOutAmount = box.parseLong(20);
      const dexFeePerTokenDenom = box.parseLong(2);
      const dexFeePerTokenNumDiff = box.parseLong(13);
      const redeemer = box.parseBytes(19);
      if (
        poolId &&
        maxMinerFee &&
        maxExFee &&
        baseAmount &&
        inAmount &&
        outId &&
        minOutAmount &&
        dexFeePerTokenDenom &&
        dexFeePerTokenNumDiff &&
        redeemer
      )
        return new SwapTokenFee(
          box.id,
          toHex(poolId),
          maxMinerFee,
          toHex(redeemer),
          { tokenId: inAmount.tokenId, amount: baseAmount },
          { tokenId: toHex(outId), amount: minOutAmount },
          dexFeePerTokenDenom - dexFeePerTokenNumDiff,
          dexFeePerTokenDenom,
          maxExFee,
        );
    }
    return undefined;
  }
}
