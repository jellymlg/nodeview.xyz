import { toHex } from "@/lib/utils";
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

export class T2TOrdersV1Parser extends CFMMOrderParser {
  deposit(box: ErgoBoxStub): Deposit | undefined {
    if (ErgoDexContractTemplates.get(box.template) === "T2T Deposit V1") {
      const poolId = box.parseBytes(13);
      const maxMinerFee = box.parseLong(25);
      const inX = box.assets[0];
      const inY = box.assets[1];
      const dexFee = box.parseLong(15);
      const redeemer = box.parsePk(0);
      if (poolId && maxMinerFee && inX && inY && dexFee && redeemer)
        return new DepositErgFee(
          box.id,
          toHex(poolId),
          maxMinerFee,
          redeemer,
          inX,
          inY,
          dexFee,
        );
    }
    return undefined;
  }
  redeem(box: ErgoBoxStub): Redeem | undefined {
    if (ErgoDexContractTemplates.get(box.template) === "T2T Redeem V1") {
      const poolId = box.parseBytes(13);
      const maxMinerFee = box.parseLong(19);
      const inLP = box.assets[0];
      const dexFee = box.parseLong(15);
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
    if (ErgoDexContractTemplates.get(box.template) === "T2T Swap V1") {
      const poolId = box.parseBytes(14);
      const maxMinerFee = box.parseLong(21);
      const inAmount = box.assets[0];
      const outId = box.parseBytes(2);
      const minOutAmount = box.parseLong(15);
      const dexFeePerTokenNum = box.parseLong(16);
      const dexFeePerTokenDenom = box.parseLong(17);
      const redeemer = box.parsePk(0);
      if (
        poolId &&
        maxMinerFee &&
        inAmount &&
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
          inAmount,
          { tokenId: toHex(outId), amount: minOutAmount },
          dexFeePerTokenNum,
          dexFeePerTokenDenom,
        );
    }
    return undefined;
  }
}
