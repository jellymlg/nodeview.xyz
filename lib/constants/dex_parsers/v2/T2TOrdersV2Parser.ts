import { toHex } from "@/lib/utils";
import { ErgoDexContractTemplates } from "../../ErgoDex";
import {
  CFMMOrderParser,
  Deposit,
  ErgoBoxStub,
  Redeem,
  Swap,
  SwapMultiAddress,
} from "../Types";

export class T2TOrdersV2Parser extends CFMMOrderParser {
  deposit(_: ErgoBoxStub): Deposit | undefined {
    return undefined;
  }
  redeem(_: ErgoBoxStub): Redeem | undefined {
    return undefined;
  }
  swap(box: ErgoBoxStub): Swap | undefined {
    if (ErgoDexContractTemplates.get(box.template) === "T2T Swap V2") {
      const poolId = box.parseBytes(14);
      const maxMinerFee = box.parseLong(22);
      const inAmount = box.assets[0];
      const outId = box.parseBytes(1);
      const minOutAmount = box.parseLong(16);
      const dexFeePerTokenNum = box.parseLong(17);
      const dexFeePerTokenDenom = box.parseLong(18);
      const redeemer = box.parseBytes(15);
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
        return new SwapMultiAddress(
          box.id,
          toHex(poolId),
          maxMinerFee,
          toHex(redeemer),
          inAmount,
          { tokenId: toHex(outId), amount: minOutAmount },
          dexFeePerTokenNum,
          dexFeePerTokenDenom,
        );
    }
    return undefined;
  }
}
