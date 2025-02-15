import { Asset, IndexedErgoBox } from "@/lib/ergo-api";
import { MainNetAddressFromErgoTree, templateFromBox } from "@/lib/utils";
import { RustModule } from "@/lib/wasm";

export const MINER_FEE = 2_000_000;
export const SPF =
  "9a06d9e545a41fd51eeffc5e20d818073bf820c635e2a9d922269913e0de369d";

export abstract class Order {
  id: string;
  poolId: string;
  maxMinerFee: number;
  redeemer: string;
  constructor(
    id: string,
    poolId: string,
    maxMinerFee: number,
    redeemer: string,
  ) {
    this.id = id;
    this.poolId = poolId;
    this.maxMinerFee = maxMinerFee;
    this.redeemer = MainNetAddressFromErgoTree(redeemer);
  }
  abstract typeName(): string;
  listProperties(): [string, string][] {
    return [
      ["Order id", this.id],
      ["Pool id", this.poolId],
      ["Maximum miner fee", "" + this.maxMinerFee],
      ["Redeemer", this.redeemer],
    ];
  }
  toString(): string {
    return "Order[type=" + this.typeName() + ",id=" + this.id + "]";
  }
}

export class ErgoBoxStub {
  id: string;
  template: string;
  assets: Asset[];
  constants: (number | Uint8Array | string | undefined)[];
  constructor(box: IndexedErgoBox) {
    this.id = box.boxId as string;
    this.template = templateFromBox(box);
    this.assets = box.assets as Asset[];
    const tree = RustModule.SigmaRust.ErgoTree.from_base16_bytes(box.ergoTree);
    const len = tree.constants_len();
    this.constants = [...Array(len)].map((e, i) => {
      const c = tree.get_constant(i);
      if (c) {
        switch (c.dbg_tpe()) {
          case "SLong":
            return c.to_i64().as_num();
          case "SColl(SByte)":
            return c.to_byte_array();
          case "SSigmaProp":
            const matches = c.dbg_inner().match(/EC:([a-fA-F0-9]+)/);
            if (matches && matches.length == 2) {
              return "0008cd" + matches[1];
            }
            return undefined;
          default:
            return undefined;
        }
      } else return undefined;
    });
  }
  parseLong(n: number): number | undefined {
    return this.constants[n] as number | undefined;
  }
  parseBytes(n: number): Uint8Array | undefined {
    return this.constants[n] as Uint8Array | undefined;
  }
  parsePk(n: number): string | undefined {
    return this.constants[n] as string | undefined;
  }
}

export abstract class CFMMOrderParser {
  abstract deposit(box: ErgoBoxStub): Deposit | undefined;
  abstract redeem(box: ErgoBoxStub): Redeem | undefined;
  abstract swap(box: ErgoBoxStub): Swap | undefined;
}

// --------------------------------------------------------------------------------------------------------------------

export class Deposit extends Order {
  inX: Asset;
  inY: Asset;
  dexFee: number;
  constructor(
    id: string,
    poolId: string,
    maxMinerFee: number,
    redeemer: string,
    inX: Asset,
    inY: Asset,
    dexFee: number,
  ) {
    super(id, poolId, maxMinerFee, redeemer);
    this.inX = inX;
    this.inY = inY;
    this.dexFee = dexFee;
  }
  typeName(): string {
    return "Deposit";
  }
  listProperties(): [string, string][] {
    return super.listProperties().concat([
      ["Input X", this.inX.amount + " of " + this.inX.tokenId],
      ["Input Y", this.inY.amount + " of " + this.inY.tokenId],
      ["Dex fee", "" + this.dexFee],
    ]);
  }
}

export class DepositErgFee extends Deposit {
  typeName(): string {
    return super.typeName() + "ErgFee";
  }
}

export class DepositTokenFee extends Deposit {
  typeName(): string {
    return super.typeName() + "TokenFee";
  }
}

// --------------------------------------------------------------------------------------------------------------------

export class Redeem extends Order {
  lp: Asset;
  dexFee: number;
  constructor(
    id: string,
    poolId: string,
    maxMinerFee: number,
    redeemer: string,
    lp: Asset,
    dexFee: number,
  ) {
    super(id, poolId, maxMinerFee, redeemer);
    this.lp = lp;
    this.dexFee = dexFee;
  }
  typeName(): string {
    return "Redeem";
  }
  listProperties(): [string, string][] {
    return super.listProperties().concat([
      ["Liquidity", this.lp.amount + " of " + this.lp.tokenId],
      ["Dex fee", "" + this.dexFee],
    ]);
  }
}

export class RedeemErgFee extends Redeem {
  typeName(): string {
    return super.typeName() + "ErgFee";
  }
}

export class RedeemTokenFee extends Redeem {
  typeName(): string {
    return super.typeName() + "TokenFee";
  }
}

// --------------------------------------------------------------------------------------------------------------------

export class Swap extends Order {
  baseAmount: Asset;
  minQuoteAmount: Asset;
  dexFeePerTokenNum: number;
  dexFeePerTokenDenom: number;
  constructor(
    id: string,
    poolId: string,
    maxMinerFee: number,
    redeemer: string,
    baseAmount: Asset,
    minQuoteAmount: Asset,
    dexFeePerTokenNum: number,
    dexFeePerTokenDenom: number,
  ) {
    super(id, poolId, maxMinerFee, redeemer);
    this.baseAmount = baseAmount;
    this.minQuoteAmount = minQuoteAmount;
    this.dexFeePerTokenNum = dexFeePerTokenNum;
    this.dexFeePerTokenDenom = dexFeePerTokenDenom;
  }
  typeName(): string {
    return "Swap";
  }
  listProperties(): [string, string][] {
    return super.listProperties().concat([
      ["Input", this.baseAmount.amount + " of " + this.baseAmount.tokenId],
      [
        "Output",
        this.minQuoteAmount.amount + " of " + this.minQuoteAmount.tokenId,
      ],
      ["Fee/token enumerator", "" + this.dexFeePerTokenNum],
      ["Fee/token denominator", "" + this.dexFeePerTokenDenom],
    ]);
  }
}

export class SwapP2Pk extends Swap {
  typeName(): string {
    return super.typeName() + "ErgP2Pk";
  }
}

export class SwapMultiAddress extends Swap {
  typeName(): string {
    return super.typeName() + "ErgMultiAddress";
  }
}

export class SwapTokenFee extends Swap {
  reservedExFee: number;
  constructor(
    id: string,
    poolId: string,
    maxMinerFee: number,
    redeemer: string,
    baseAmount: Asset,
    minQuoteAmount: Asset,
    dexFeePerTokenNum: number,
    dexFeePerTokenDenom: number,
    reservedExFee: number,
  ) {
    super(
      id,
      poolId,
      maxMinerFee,
      redeemer,
      baseAmount,
      minQuoteAmount,
      dexFeePerTokenNum,
      dexFeePerTokenDenom,
    );
    this.reservedExFee = reservedExFee;
  }
  typeName(): string {
    return super.typeName() + "TokenFee";
  }
  listProperties(): [string, string][] {
    return super
      .listProperties()
      .concat([["Reserved ex fee", "" + this.reservedExFee]]);
  }
}
