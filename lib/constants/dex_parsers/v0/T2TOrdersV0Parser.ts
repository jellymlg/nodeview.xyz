import { toHex } from "@/lib/utils";
import { ErgoDexContractTemplates } from "../../ErgoDex";
import {
  CFMMOrderParser,
  ErgoBoxStub,
  Deposit,
  Redeem,
  Swap,
  DepositErgFee,
  MINER_FEE,
  RedeemErgFee,
  SwapP2Pk,
} from "../Types";

export class T2TOrdersV0Parser extends CFMMOrderParser {
  deposit(box: ErgoBoxStub): Deposit | undefined {
    if (
      ErgoDexContractTemplates.get(box.template) === "T2T Deposit V0 (legacy)"
    ) {
      const poolId = box.parseBytes(9);
      const inX = box.assets[0];
      const inY = box.assets[1];
      const dexFee = box.parseLong(11);
      const redeemer = box.parsePk(0);
      if (poolId && inX && inY && dexFee && redeemer)
        return new DepositErgFee(
          box.id,
          toHex(poolId),
          MINER_FEE,
          redeemer,
          inX,
          inY,
          dexFee,
        );
    }
    if (
      ErgoDexContractTemplates.get(box.template) === "T2T Deposit V1 (legacy)"
    ) {
      const poolId = box.parseBytes(13);
      const inX = box.assets[0];
      const inY = box.assets[1];
      const dexFee = box.parseLong(15);
      const redeemer = box.parsePk(0);
      if (poolId && inX && inY && dexFee && redeemer)
        return new DepositErgFee(
          box.id,
          toHex(poolId),
          MINER_FEE,
          redeemer,
          inX,
          inY,
          dexFee,
        );
    }
    return undefined;
  }
  redeem(box: ErgoBoxStub): Redeem | undefined {
    if (
      ErgoDexContractTemplates.get(box.template) === "T2T Redeem V0 (legacy)"
    ) {
      const poolId = box.parseBytes(13);
      const inLP = box.assets[0];
      const dexFee = box.parseLong(15);
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
    if (ErgoDexContractTemplates.get(box.template) === "T2T Swap V0 (legacy)") {
      const poolId = box.parseBytes(14);
      const inAmount = box.assets[0];
      const outId = box.parseBytes(2);
      const minOutAmount = box.parseLong(15);
      const dexFeePerTokenNum = box.parseLong(16);
      const dexFeePerTokenDenum = box.parseLong(17);
      const redeemer = box.parsePk(0);
      if (
        poolId &&
        inAmount &&
        outId &&
        minOutAmount &&
        dexFeePerTokenNum &&
        dexFeePerTokenDenum &&
        redeemer
      )
        return new SwapP2Pk(
          box.id,
          toHex(poolId),
          MINER_FEE,
          redeemer,
          inAmount,
          { tokenId: toHex(outId), amount: minOutAmount },
          dexFeePerTokenNum,
          dexFeePerTokenDenum,
        );
    }
    return undefined;
  }
}
