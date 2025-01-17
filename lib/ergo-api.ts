/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface ErgoTransactionInput {
  /** Base16-encoded transaction box id bytes. Should be 32 bytes long */
  boxId: TransactionBoxId;
  /** Spending proof for transaction input */
  spendingProof: SpendingProof;
}

export interface ErgoTransactionDataInput {
  /** Base16-encoded transaction box id bytes. Should be 32 bytes long */
  boxId: TransactionBoxId;
}

export interface ErgoTransactionUnsignedInput {
  /** Base16-encoded transaction box id bytes. Should be 32 bytes long */
  boxId: TransactionBoxId;
  /** @example {"1":"a2aed72ff1b139f35d1ad2938cb44c9848a34d4dcfd6d8ab717ebde40a7304f2541cf628ffc8b5c496e6161eba3f169c6dd440704b1719e0"} */
  extension?: Record<string, SValue>;
}

/** Spending proof for transaction input */
export interface SpendingProof {
  /** Base16-encoded spending proofs */
  proofBytes: SpendingProofBytes;
  /**
   * Variables to be put into context
   * @example {"1":"a2aed72ff1b139f35d1ad2938cb44c9848a34d4dcfd6d8ab717ebde40a7304f2541cf628ffc8b5c496e6161eba3f169c6dd440704b1719e0"}
   */
  extension: Record<string, SValue>;
}

export interface SerializedBox {
  /** Base16-encoded transaction box id bytes. Should be 32 bytes long */
  boxId: TransactionBoxId;
  /** Base16-encoded bytes */
  bytes: HexString;
}

export interface ScriptBytes {
  /** Base16-encoded bytes */
  bytes: HexString;
}

export interface SnapshotsInfo {
  /** Map of available manifests height -> manifestId */
  availableManifests: object[];
}

export interface ErgoTransactionOutput {
  /** Base16-encoded transaction box id bytes. Should be 32 bytes long */
  boxId?: TransactionBoxId;
  /**
   * Amount of Ergo token
   * @format int64
   * @min 0
   * @example 147
   */
  value: number;
  /** Base16-encoded ergo tree bytes */
  ergoTree: ErgoTree;
  /**
   * Height the output was created at
   * @format int32
   * @example 9149
   */
  creationHeight: number;
  /** Assets list in the transaction */
  assets?: Asset[];
  /** Ergo box registers */
  additionalRegisters: Registers;
  /** Base16-encoded transaction id bytes */
  transactionId?: TransactionId;
  /**
   * Index in the transaction outputs
   * @format int32
   */
  index?: number;
}

export interface WalletBox {
  box: ErgoTransactionOutput;
  /**
   * Number of confirmations, if the box is included into the blockchain
   * @format int32
   * @min 0
   * @example 147
   */
  confirmationsNum: number | null;
  /** Encoded Ergo Address */
  address: ErgoAddress;
  /** Transaction which created the box */
  creationTransaction: ModifierId;
  /** Transaction which created the box */
  spendingTransaction: ModifierId | null;
  /**
   * The height the box was spent at
   * @format int32
   * @min 0
   * @example 147
   */
  spendingHeight: number | null;
  /**
   * The height the transaction containing the box was included in a block at
   * @format int32
   * @min 0
   * @example 147
   */
  inclusionHeight: number;
  /**
   * A flag signalling whether the box is created on main chain
   * @example true
   */
  onchain: boolean;
  /**
   * A flag signalling whether the box was spent
   * @example false
   */
  spent: boolean;
  /**
   * An index of a box in the creating transaction
   * @format int32
   * @example 2
   */
  creationOutIndex: number;
  /** Scan identifiers the box relates to */
  scans: number[];
}

/** Balance information */
export interface BalanceInfo {
  /**
   * Balance of nanoERGs
   * @format int64
   */
  nanoErgs: number;
  /** Balance of tokens */
  tokens: {
    /** Identifier of the token */
    tokenId?: ModifierId;
    /**
     * Amount of the token
     * @format int64
     */
    amount?: number;
    /** Number of decimals of the token */
    decimals?: number;
    /** Name of the token, if any */
    name?: string;
  }[];
}

/** Box indexed with extra information */
export type IndexedErgoBox = ErgoTransactionOutput & {
  /** Encoded Ergo Address */
  address: ErgoAddress;
  /** Transaction which spent the box */
  spentTransactionId: ModifierId | null;
  /**
   * The height the box was spent at
   * @format int32
   * @min 0
   * @example 147
   */
  spendingHeight: number | null;
  /**
   * The height the transaction containing the box was included in a block at
   * @format int32
   * @min 0
   * @example 147
   */
  inclusionHeight: number;
  /**
   * Global index of the output in the blockchain
   * @format int64
   * @min 0
   * @example 83927
   */
  globalIndex: number;
};

/** Token indexed with extra information */
export interface IndexedToken {
  /** Id of the token */
  id: ModifierId;
  /** Id of the box that created the token */
  boxId: ModifierId;
  /**
   * The total supply of the token
   * @format int64
   * @min 1
   * @example 3500000
   */
  emissionAmount: number;
  /** The name of the token */
  name: string;
  /** The description of the token */
  description: string;
  /**
   * The number of decimals the token supports
   * @format int32
   * @min 0
   * @example 8
   */
  decimals: number;
}

/** Unsigned Ergo transaction */
export interface UnsignedErgoTransaction {
  /** Base16-encoded transaction id bytes */
  id?: TransactionId;
  /** Unsigned inputs of the transaction */
  inputs: ErgoTransactionUnsignedInput[];
  /** Data inputs of the transaction */
  dataInputs: ErgoTransactionDataInput[];
  /** Outputs of the transaction */
  outputs: ErgoTransactionOutput[];
}

/** ErgoTransaction is an atomic operation which changes UTXO state. */
export interface ErgoTransaction {
  /** Id of the transaction */
  id?: TransactionId;
  /** Inputs, that will be spent by this transaction */
  inputs: ErgoTransactionInput[];
  /** Read-only inputs, that are not going to be spent by transaction. */
  dataInputs: ErgoTransactionDataInput[];
  /** Outputs of the transaction, i.e. box candidates to be created by this transaction. */
  outputs: ErgoTransactionOutput[];
  /**
   * Size of ErgoTransaction in bytes
   * @format int32
   */
  size?: number;
}

/** Transaction augmented with some useful information */
export interface WalletTransaction {
  /** Base16-encoded transaction id bytes */
  id?: TransactionId;
  /** Transaction inputs */
  inputs: ErgoTransactionInput[];
  /** Transaction data inputs */
  dataInputs: ErgoTransactionDataInput[];
  /** Transaction outputs */
  outputs: ErgoTransactionOutput[];
  /**
   * Height of a block the transaction was included in
   * @format int32
   * @example 20998
   */
  inclusionHeight: number;
  /**
   * Number of transaction confirmations
   * @format int32
   * @example 20998
   */
  numConfirmations: number;
  /** Scan identifiers the transaction relates to */
  scans: number[];
  /**
   * Size in bytes
   * @format int32
   */
  size?: number;
}

/** Transaction indexed with extra information */
export interface IndexedErgoTransaction {
  /** Base16-encoded transaction id bytes */
  id: TransactionId;
  /** Transaction inputs */
  inputs: IndexedErgoBox[];
  /** Transaction data inputs */
  dataInputs: ErgoTransactionDataInput[];
  /** Transaction outputs */
  outputs: IndexedErgoBox[];
  /**
   * Height of a block the transaction was included in
   * @format int32
   * @example 20998
   */
  inclusionHeight: number;
  /**
   * Number of transaction confirmations
   * @format int32
   * @example 20998
   */
  numConfirmations: number;
  /** Id of the block the transaction was included in */
  blockId: ModifierId;
  /** Basic timestamp definition */
  timestamp: Timestamp;
  /**
   * index of the transaction in the block it was included in
   * @format int32
   * @example 3
   */
  index: number;
  /**
   * Global index of the transaction in the blockchain
   * @format int64
   * @example 3565445
   */
  globalIndex: number;
  /**
   * Size in bytes
   * @format int32
   */
  size: number;
}

/**
 * Encoded Ergo Address
 * @example "3WwbzW6u8hKWBcL1W7kNVMr25s2UHfSBnYtwSHvrRQt7DdPuoXrt"
 */
export type ErgoAddress = string;

export interface RewardAddress {
  /** Encoded Ergo Address */
  rewardAddress: ErgoAddress;
}

export interface RewardPubKey {
  /** @example "02a7955281885bf0f0ca4a48678848cad8dc5b328ce8bc1d4481d041c98e891ff3" */
  rewardPubkey: string;
}

/**
 * Hex-encoded big-endian 256-bits secret exponent
 * @example "433080ff80d0d52d7f8bfffff47f00807f44f680000949b800007f7f7ff1017f"
 */
export type DlogSecret = string;

/** Hex-encoded big-endian 256-bits secret exponent "w" along with generators "g", "h", and group elements "u", "v", such as g^w = u, h^w = v */
export interface DhtSecret {
  /**
   * Hex-encoded big-endian 256-bits secret exponent
   * @example "433080ff80d0d52d7f8bfffff47f00807f44f680000949b800007f7f7ff1017f"
   */
  secret: string;
  /**
   * Hex-encoded "g" generator for the Diffie-Hellman tuple (secp256k1 curve point)
   * @example "02a7955281885bf0f0ca4a48678848cad8dc5b328ce8bc1d4481d041c98e891ff3"
   */
  g: string;
  /**
   * Hex-encoded "h" generator for the Diffie-Hellman tuple (secp256k1 curve point)
   * @example "02a7955281885bf0f0ca4a48678848cad8dc5b328ce8bc1d4481d041c98e891ff3"
   */
  h: string;
  /**
   * Hex-encoded "u" group element of the Diffie-Hellman tuple (secp256k1 curve point)
   * @example "02a7955281885bf0f0ca4a48678848cad8dc5b328ce8bc1d4481d041c98e891ff3"
   */
  u: string;
  /**
   * Hex-encoded "v" group element of the Diffie-Hellman tuple (secp256k1 curve point)
   * @example "02a7955281885bf0f0ca4a48678848cad8dc5b328ce8bc1d4481d041c98e891ff3"
   */
  v: string;
}

/** A request to sign a transaction with secrets provided */
export interface TransactionSigningRequest {
  /** Unsigned transaction to sign */
  tx: UnsignedErgoTransaction;
  /** Optional list of inputs to be used in serialized form */
  inputsRaw?: string[];
  /** Optional list of inputs to be used in serialized form */
  dataInputsRaw?: string[];
  /** Optional list of hints used for signing */
  hints?: TransactionHintsBag;
  /** Secrets used for signing */
  secrets: {
    /** Sequence of secret exponents (DLOG secrets) */
    dlog?: DlogSecret[];
    /** Sequence of secret Diffie-Hellman tuple exponents (DHT secrets) */
    dht?: DhtSecret[];
  };
}

/** Holds encoded ErgoAddress */
export interface AddressHolder {
  /** Encoded Ergo Address */
  address: ErgoAddress;
}

/** Holds request for wallet boxes */
export interface BoxesRequestHolder {
  /** Target assets */
  targetAssets: (string | number)[][];
  /**
   * Target balance
   * @format int64
   */
  targetBalance: number;
}

/** Holds many transaction requests and transaction fee */
export interface RequestsHolder {
  /** Sequence of transaction requests */
  requests: (PaymentRequest | BurnTokensRequest | AssetIssueRequest)[];
  /**
   * Transaction fee
   * @format int64
   * @example 1000000
   */
  fee?: number;
  /** List of inputs to be used in serialized form */
  inputsRaw?: string[];
  /** List of data inputs to be used in serialized form */
  dataInputsRaw?: string[];
}

export interface SourceHolder {
  /** Sigma source to be compiled */
  source: string;
}

export interface ErgoLikeTransaction {
  /** Base16-encoded 32 byte modifier id */
  id: ModifierId;
  inputs: ErgoTransactionInput[];
  dataInputs: ErgoTransactionDataInput[];
  outputs: ErgoTransactionOutput[];
}

/** Block header format used for sigma ErgoLikeContext */
export interface SigmaHeader {
  /** Base16-encoded 32 byte modifier id */
  id?: ModifierId;
  /** Basic timestamp definition */
  timestamp: Timestamp;
  /** Ergo blockchain protocol version */
  version: Version;
  /** Base16-encoded 32 byte digest */
  adProofsRoot: Digest32;
  /** Base16-encoded 32 byte modifier id */
  adProofsId?: ModifierId;
  stateRoot: AvlTreeData;
  /** Base16-encoded 32 byte digest */
  transactionsRoot: Digest32;
  /** Base16-encoded 32 byte modifier id */
  transactionsId?: ModifierId;
  /**
   * @format int64
   * @min 0
   * @example 19857408
   */
  nBits: number;
  /** Base16-encoded 32 byte digest */
  extensionHash: Digest32;
  /** Base16-encoded 32 byte digest */
  extensionRoot?: Digest32;
  /** Base16-encoded 32 byte modifier id */
  extensionId?: ModifierId;
  /**
   * @format int32
   * @min 0
   * @example 667
   */
  height: number;
  /**
   * @format int32
   * @min 0
   * @example 667
   */
  size?: number;
  /** Base16-encoded 32 byte modifier id */
  parentId: ModifierId;
  /** An object containing all components of pow solution */
  powSolutions?: PowSolutions;
  /** Base16-encoded votes for a soft-fork and parameters */
  votes: Votes;
  /** @example "0279be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798" */
  minerPk?: string;
  /** @example "0279be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798" */
  powOnetimePk?: string;
  /** Base16-encoded 32 byte digest */
  powNonce?: Digest32;
  /**
   * sigma.BigInt
   * @example 123456789
   */
  powDistance?: number;
}

export interface PreHeader {
  /** Basic timestamp definition */
  timestamp: Timestamp;
  /** Ergo blockchain protocol version */
  version: Version;
  /**
   * @format int64
   * @min 0
   * @example 19857408
   */
  nBits: number;
  /**
   * @format int32
   * @min 0
   * @example 667
   */
  height: number;
  /** Base16-encoded 32 byte modifier id */
  parentId: ModifierId;
  /** Base16-encoded votes for a soft-fork and parameters */
  votes: Votes;
  /** @example "0279be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798" */
  minerPk?: string;
}

export interface AvlTreeData {
  /** Base16-encoded 32 byte digest */
  digest: Digest32;
  /** @format int32 */
  treeFlags?: number;
  /** @format int32 */
  keyLength?: number;
  /** @format int32 */
  valueLength?: number | null;
}

export interface ErgoLikeContext {
  /** state root before current block application */
  lastBlockUtxoRoot: AvlTreeData;
  /** fixed number of last block headers in descending order (first header is the newest one) */
  headers: SigmaHeader[];
  /** fields of block header with the current `spendingTransaction`, that can be predicted by a miner before its formation */
  preHeader: PreHeader;
  /** boxes, that corresponds to id's of `spendingTransaction.dataInputs` */
  dataBoxes: ErgoTransactionOutput[];
  /** boxes, that corresponds to id's of `spendingTransaction.inputs` */
  boxesToSpend: ErgoTransactionOutput[];
  /** transaction that contains `self` box */
  spendingTransaction: ErgoLikeTransaction;
  /**
   * index of the box in `boxesToSpend` that contains the script we're evaluating
   * @format int64
   */
  selfIndex: number;
  /** prover-defined key-value pairs, that may be used inside a script */
  extension: object;
  /**
   * validation parameters passed to Interpreter.verify to detect soft-fork conditions
   * @example "10e8070001e9070001ea070001eb070001ec070001ed070001ee070001ef070001f0070001f1070001f2070001f3070001f4070001f5070001f6070001f7070001"
   */
  validationSettings: string;
  /**
   * hard limit on accumulated execution cost, if exceeded lead to CostLimitException to be thrown
   * @format int64
   */
  costLimit: number;
  /**
   * initial value of execution cost already accumulated before Interpreter.verify is called
   * @format int64
   */
  initCost: number;
}

export interface ExecuteScript {
  /** Sigma script to be executed */
  script: string;
  /** Environment for compiler */
  namedConstants: object | null;
  /** Interpreter context */
  context: ErgoLikeContext | null;
}

/** Algebraic data type of sigma proposition expressions */
export interface SigmaBoolean {
  /**
   * Sigma opCode
   * @format int8
   */
  op: number;
  /** Base16-encoded bytes */
  h?: HexString;
  /** Base16-encoded bytes */
  g?: HexString;
  /** Base16-encoded bytes */
  u?: HexString;
  /** Base16-encoded bytes */
  v?: HexString;
  condition?: boolean;
}

export type SigmaBooleanAndPredicate = SigmaBoolean &
  object & {
    args?: SigmaBoolean[];
  };

export type SigmaBooleanOrPredicate = SigmaBoolean &
  object & {
    args?: SigmaBoolean[];
  };

export type SigmaBooleanThresholdPredicate = SigmaBoolean &
  object & {
    args?: SigmaBoolean[];
  };

/**
 * Result of executeWithContext request (reduceToCrypto)
 * @example {"value":{"op":-45,"condition":true},"cost":10}
 */
export interface CryptoResult {
  /** value of SigmaProp type which represents a statement verifiable via sigma protocol */
  value: SigmaBoolean;
  /**
   * Estimated cost of contract execution
   * @format int64
   */
  cost: number;
}

export interface ScanningPredicate {
  predicate: string;
}

export type ContainsPredicate = ScanningPredicate &
  object & {
    register?: string;
    bytes?: string;
  };

export type EqualsPredicate = ScanningPredicate &
  object & {
    register?: string;
    bytes?: string;
  };

export type ContainsAssetPredicate = ScanningPredicate &
  object & {
    assetId?: string;
  };

export type AndPredicate = ScanningPredicate &
  object & {
    args?: ScanningPredicate[];
  };

export type OrPredicate = ScanningPredicate &
  object & {
    args?: ScanningPredicate[];
  };

/** @example {"scanName":"Assets Tracker","walletInteraction":"off","removeOffchain":true,"trackingRule":{"predicate":"containsAsset","assetId":"02dada811a888cd0dc7a0a41739a3ad9b0f427741fe6ca19700cf1a51200c96bf7"}} */
export interface ScanRequest {
  scanName?: string;
  removeOffchain?: boolean;
  walletInteraction?: "off" | "shared" | "forced";
  trackingRule?: ScanningPredicate;
}

/** @example {"scanId":2,"scanName":"Assets Tracker","walletInteraction":"off","removeOffchain":true,"trackingRule":{"predicate":"containsAsset","assetId":"02dada811a888cd0dc7a0a41739a3ad9b0f427741fe6ca19700cf1a51200c96bf7"}} */
export interface Scan {
  scanName?: string;
  scanId?: number;
  walletInteraction?: "off" | "shared" | "forced";
  removeOffchain?: boolean;
  trackingRule?: ScanningPredicate;
}

export interface ScanId {
  scanId?: number;
}

export interface ScanIdBoxId {
  scanId: number;
  /** Base16-encoded transaction box id bytes. Should be 32 bytes long */
  boxId: TransactionBoxId;
}

/** Ergo box with associated scans (their respective identifiers) */
export interface ScanIdsBox {
  scanIds: number[];
  box: ErgoTransactionOutput;
}

/** Randomness and commitment for the first step of the Schnorr protocol */
export interface DlogCommitment {
  /**
   * Hex-encoded big-endian 256-bits secret exponent
   * @example "433080ff80d0d52d7f8bfffff47f00807f44f680000949b800007f7f7ff1017f"
   */
  r: string;
  /**
   * Hex-encoded "g" generator for the Diffie-Hellman tuple (secp256k1 curve point)
   * @example "02a7955281885bf0f0ca4a48678848cad8dc5b328ce8bc1d4481d041c98e891ff3"
   */
  a: string;
}

/** request to extract prover hints from a transaction */
export interface HintExtractionRequest {
  /** Transaction to extract prover hints from */
  tx: ErgoTransaction;
  /** Real signers of the transaction */
  real: SigmaBoolean[];
  /** Simulated signers of the transaction */
  simulated: SigmaBoolean[];
  /** Optional list of inputs to be used in serialized form */
  inputsRaw?: string[];
  /** Optional list of inputs to be used in serialized form */
  dataInputsRaw?: string[];
}

/** basic trait for prover commitments */
export interface Commitment {
  hint: "cmtWithSecret" | "cmtReal" | "cmtSimulated";
  /** Algebraic data type of sigma proposition expressions */
  pubkey: SigmaBoolean;
  position: string;
  type?: "dlog" | "dht";
  /** a group element of the commitment */
  a: string;
  /** b group element of the commitment (needed for DHT protocol only) */
  b?: string;
}

/** commitment to secret along with secret (!) randomness */
export type CommitmentWithSecret = Commitment;

export interface SecretProven {
  hint: "proofReal" | "proofSimulated";
  challenge: string;
  /** Algebraic data type of sigma proposition expressions */
  pubkey: SigmaBoolean;
  proof: string;
  position: string;
}

/**
 * hints for inputs, key is input index, values is a set of hints for the input
 * @example {"01":[{"hint":"cmtWithSecret","pubkey":{"op":-51,"h":"0327e65711a59378c59359c3e1d0f7abe906479eccb76094e50fe79d743ccc15e6"},"position":"0-1","type":"dlog","a":"02924d6274d1b9132fe028a0e3ac2fdbc503a1e52d1398932fa5f1bcf71909eb4b","secret":"42a2a0ae6b98ee791ac9734252e8a7a08e691b92de085138e302f64a722a4300"}]}
 */
export type InputHints = Record<
  string,
  (
    | ({
        objectType: "cmtWithSecret";
      } & CommitmentWithSecret)
    | ({
        objectType: "cmtReal";
      } & Commitment)
    | ({
        objectType: "cmtSimulated";
      } & Commitment)
    | ({
        objectType: "proofReal";
      } & SecretProven)
    | ({
        objectType: "proofSimulated";
      } & SecretProven)
  )[]
>;

/** prover hints extracted from a transaction */
export interface TransactionHintsBag {
  /** Hints which contain secrets, do not share them! */
  secretHints?: InputHints[];
  /** Hints which contain public data only, share them freely! */
  publicHints?: InputHints[];
}

/** request to generate commitments to sign a transaction */
export interface GenerateCommitmentsRequest {
  /** Unsigned transaction to sign */
  tx: UnsignedErgoTransaction;
  /** Optionally, external secrets used for signing */
  secrets?: {
    /** Sequence of secret exponents (DLOG secrets) */
    dlog?: DlogSecret[];
    /** Sequence of secret Diffie-Hellman tuple exponents (DHT secrets) */
    dht?: DhtSecret[];
  };
  /** Optional list of inputs to be used in serialized form */
  inputsRaw?: string[];
  /** Optional list of inputs to be used in serialized form */
  dataInputsRaw?: string[];
}

/** Request for getting a secret corresponding to wallet address */
export interface PrivateKeyRequest {
  /** Encoded Ergo Address */
  address: ErgoAddress;
}

/** Request for generation of payment transaction to a given address */
export interface PaymentRequest {
  /** Encoded Ergo Address */
  address: ErgoAddress;
  /**
   * Payment amount
   * @format int64
   * @example 1
   */
  value: number;
  /** Assets list in the transaction */
  assets?: Asset[];
  /** Ergo box registers */
  registers?: Registers;
}

/** Request for burning tokens in wallet */
export interface BurnTokensRequest {
  /** Assets list to burn in the transaction */
  assetsToBurn: Asset[];
}

/** Request for generation of asset issue transaction */
export interface AssetIssueRequest {
  /** Optional, first address in the wallet will be used if not defined */
  address?: ErgoAddress;
  /**
   * Optional, amount of ergs to be put into box with issued assets
   * @format int64
   */
  ergValue?: number;
  /**
   * Supply amount
   * @format int64
   * @example 1000000
   */
  amount: number;
  /**
   * Assets name
   * @example "TST"
   */
  name: string;
  /**
   * Assets description
   * @example "Test token"
   */
  description: string;
  /**
   * Number of decimal places
   * @format int32
   * @example 8
   */
  decimals: number;
  /** Optional, possible values for registers R7...R9 */
  registers?: Registers;
}

/** Block with header and transactions */
export interface FullBlock {
  /** Header of a block. It authenticates link to a previous block, other block sections (transactions, UTXO set transformation proofs, extension), UTXO set, votes for blockchain parameters to be changed and proof-of-work related data. */
  header: BlockHeader;
  /** Section of a block which contains transactions. */
  blockTransactions: BlockTransactions;
  adProofs: BlockADProofs;
  /** Section of a block which contains extension data. */
  extension: Extension;
  /**
   * Size in bytes
   * @format int32
   */
  size: number;
}

/** An object containing all components of pow solution */
export interface PowSolutions {
  /**
   * Base16-encoded public key
   * @example "0350e25cee8562697d55275c96bb01b34228f9bd68fd9933f2a25ff195526864f5"
   */
  pk: string;
  /** @example "0366ea253123dfdb8d6d9ca2cb9ea98629e8f34015b1e4ba942b1d88badfcc6a12" */
  w: string;
  /** @example "0000000000000000" */
  n: string;
  /** @example 987654321 */
  d: number;
}

export interface BlockHeaderWithoutPow {
  /** Base16-encoded 32 byte modifier id */
  id: ModifierId;
  /** Basic timestamp definition */
  timestamp: Timestamp;
  /** Ergo blockchain protocol version */
  version: Version;
  /** Base16-encoded 32 byte digest */
  adProofsRoot: Digest32;
  /** Base16-encoded 33 byte digest - digest with extra byte with tree height */
  stateRoot: ADDigest;
  /** Base16-encoded 32 byte digest */
  transactionsRoot: Digest32;
  /**
   * @format int64
   * @min 0
   * @example 19857408
   */
  nBits: number;
  /** Base16-encoded 32 byte digest */
  extensionHash: Digest32;
  /**
   * @format int32
   * @min 0
   * @example 667
   */
  height: number;
  /**
   * @format int32
   * @min 0
   * @example 62
   */
  difficulty: number;
  /** Base16-encoded 32 byte modifier id */
  parentId: ModifierId;
  /** Base16-encoded votes for a soft-fork and parameters */
  votes: Votes;
  /**
   * Size in bytes
   * @format int32
   */
  size?: number;
  /** Base16-encoded 32 byte modifier id */
  extensionId?: ModifierId;
  /** Base16-encoded 32 byte modifier id */
  transactionsId?: ModifierId;
  /** Base16-encoded 32 byte modifier id */
  adProofsId?: ModifierId;
}

export interface PopowHeader {
  /** Header of a block. It authenticates link to a previous block, other block sections (transactions, UTXO set transformation proofs, extension), UTXO set, votes for blockchain parameters to be changed and proof-of-work related data. */
  header: BlockHeader;
  /** Array of header interlinks */
  interlinks: ModifierId[];
}

export interface NipopowProof {
  /** security parameter (min μ-level superchain length) */
  m: number;
  /** security parameter (min suffix length, >= 1) */
  k: number;
  /** proof prefix headers */
  prefix: PopowHeader[];
  suffixHead: PopowHeader;
  /** tail of the proof suffix headers */
  suffixTail: BlockHeader[];
}

/** Header of a block. It authenticates link to a previous block, other block sections (transactions, UTXO set transformation proofs, extension), UTXO set, votes for blockchain parameters to be changed and proof-of-work related data. */
export interface BlockHeader {
  /** Block id */
  id: ModifierId;
  /** Block generation time reported by a miner */
  timestamp: Timestamp;
  /** Protocol version used to generate the block */
  version: Version;
  /** Digest of UTXO set transformation proofs */
  adProofsRoot: Digest32;
  /** AVL+ tree digest of UTXO set (after the block is applied) */
  stateRoot: ADDigest;
  /** Merkle tree digest of transactions in the block (BlockTransactions section) */
  transactionsRoot: Digest32;
  /**
   * Proof-of-work target (difficulty encoded)
   * @format int64
   * @min 0
   * @example 19857408
   */
  nBits: number;
  /** Merkle tree digest of the extension section of the block */
  extensionHash: Digest32;
  /** Solution for the proof-of-work puzzle */
  powSolutions: PowSolutions;
  /**
   * Height of the block (genesis block height == 1)
   * @format int32
   * @min 0
   * @example 667
   */
  height: number;
  /** @example "9575989248" */
  difficulty: string;
  /** Base16-encoded 32 byte modifier id */
  parentId: ModifierId;
  /** Votes for changing system parameters */
  votes: Votes;
  /**
   * Size of the header in bytes
   * @format int32
   */
  size?: number;
  /** Hash of the extension section of the block == hash(modifier type id, header id, extensionHash) */
  extensionId?: ModifierId;
  /** Hash of the transactions section of the block == hash(modifier type id, header id, transactionsRoot) */
  transactionsId?: ModifierId;
  /** Hash of the UTXO set transformation proofs section of the block == hash(modifier type id, header id, adProofsRoot) */
  adProofsId?: ModifierId;
}

/** Section of a block which contains transactions. */
export interface BlockTransactions {
  /** Identifier of a header of a corresponding block */
  headerId: ModifierId;
  /** Transactions of the block */
  transactions: Transactions;
  /**
   * Size in bytes of all block transactions
   * @format int32
   */
  size: number;
}

export interface BlockADProofs {
  /** Identifier of a header of the block which contains the proofs */
  headerId: ModifierId;
  /** Serialized bytes of the authenticated dictionary proof */
  proofBytes: SerializedAdProof;
  /** Hash of the proofBytes */
  digest: Digest32;
  /**
   * Size in bytes
   * @format int32
   */
  size: number;
}

/** Section of a block which contains extension data. */
export interface Extension {
  /** Identifier of a header of a corresponding block */
  headerId: ModifierId;
  /** Root hash (aka digest) merkelized list of key-value records */
  digest: Digest32;
  /** List of key-value records */
  fields: KeyValueItem[] | null;
}

/** Key-value record represented as a pair of hex strings in an array. */
export type KeyValueItem = HexString[];

/** Can be null if node is not mining or candidate block is not ready */
export type CandidateBlock = {
  /**
   * @format int8
   * @example 2
   */
  version?: number;
  /** Base16-encoded 32 byte digest */
  extensionHash: Digest32;
  /** Basic timestamp definition */
  timestamp?: Timestamp;
  /** Base16-encoded 33 byte digest - digest with extra byte with tree height */
  stateRoot?: ADDigest;
  /**
   * @format int64
   * @min 0
   * @example 19857408
   */
  nBits?: number;
  /** Base16-encoded ad proofs */
  adProofBytes?: SerializedAdProof;
  /** Base16-encoded 32 byte modifier id */
  parentId: ModifierId;
  /**
   * @format int32
   * @example 2
   */
  transactionsNumber?: number;
  /** List of ErgoTransaction objects */
  transactions?: Transactions;
  /** Base16-encoded votes for a soft-fork and parameters */
  votes?: Votes;
} | null;

export interface PassphraseMatch {
  /** true if passphrase matches wallet, false otherwise */
  matched: boolean;
}

/** Status of the node wallet */
export interface WalletStatus {
  /** true if wallet is initialized, false otherwise */
  isInitialized: boolean;
  /** true if wallet is unlocked, false otherwise */
  isUnlocked: boolean;
  /**
   * address to send change to. Empty when wallet is not initialized or locked. By default change address correponds to root key address, could be set via /wallet/updateChangeAddress method.
   * @example "3WzCFq7mkykKqi4Ykdk8BK814tkh6EsPmA42pQZxU2NRwSDgd6yB"
   */
  changeAddress: string;
  /** last scanned height for the wallet (and external scans) */
  walletHeight: number;
  /** last wallet error caught */
  error: string;
}

export interface InitWallet {
  /** Password to encrypt wallet file with */
  pass: string;
  /** Optional pass to password-protect mnemonic seed */
  mnemonicPass?: string;
}

export interface InitWalletResult {
  /** Mnemonic seed phrase */
  mnemonic: string;
}

export interface RestoreWallet {
  /** Password to encrypt wallet file with */
  pass: string;
  /** Mnemonic seed */
  mnemonic: string;
  /** Optional pass to password-protect mnemonic seed */
  mnemonicPass?: string;
  /** use incorrect(previous) BIP32 key derivation (see https://github.com/ergoplatform/ergo/issues/1627 for details). It's recommended to set to 'true' if the original wallet was created by ergo node before v4.0.105. */
  usePre1627KeyDerivation: boolean;
}

export interface CheckWallet {
  /** Mnemonic seed (optional) */
  mnemonic: string;
  /** Optional pass to password-protect mnemonic seed */
  mnemonicPass?: string;
}

export interface UnlockWallet {
  /** Password to decrypt wallet file with */
  pass: string;
}

export interface DeriveKey {
  /**
   * Derivation path for a new secret to derive
   * @example "m/1/2"
   */
  derivationPath: string;
}

export interface DeriveKeyResult {
  /** Encoded Ergo Address */
  address: ErgoAddress;
}

export interface DeriveNextKeyResult {
  /**
   * Derivation path of the resulted secret
   * @example "m/1/2"
   */
  derivationPath: string;
  /** Encoded Ergo Address */
  address: ErgoAddress;
}

/** Merkle proof for a leaf, which is an array of bytes (e.g. a transaction identifier) */
export interface MerkleProof {
  /**
   * Base16-encoded Merkle tree leaf bytes
   * @example "cd665e49c834b0c25574fcb19a158d836f3f2aad8e91ac195f972534c25449b3"
   */
  leaf: string;
  /** @example [["018b7ae20a4acd23e3f1bf38671ce97103ad96d8f1c780b5e5e865e4873ae16337",0]] */
  levels: (string | number)[][];
}

/** Proof that a block corresponding to given header without PoW contains some transactions */
export interface ProofOfUpcomingTransactions {
  /**
   * Base16-encoded serialized header without Proof-of-Work
   * @example "0112e03c6d39d32509855be7cee9b62ff921f7a0cf6883e232474bd5b54d816dd056f846980d34c3b23098bdcf41222f8cdee5219224aa67750055926c3a2310a483accc4f9153e7a760615ea972ac67911cff111f8c17f563d6147205f58f85133ae695d1d4157e4aecdbbb29952cfa42b75129db55bddfce3bc53b8fd5b5465f10d8be8ddda62ed3b86afb0497ff2d381ed884bdae5287d20667def224a28d2b6e3ebfc78709780702c70bd8df0e000000"
   */
  msgPreimage: string;
  /** Merkle proofs of transactions included into blocks (not necessarily all the block transactions) */
  txProofs: MerkleProof[];
}

/** Block candidate related data for external miner to perform work */
export interface WorkMessage {
  /**
   * Base16-encoded block header bytes without PoW solution
   * @example "0350e25cee8562697d55275c96bb01b34228f9bd68fd9933f2a25ff195526864f5"
   */
  msg: string;
  /**
   * Work target value
   * @example 987654321
   */
  b: number;
  /**
   * Base16-encoded miner public key
   * @example "0350e25cee8562697d55275c96bb01b34228f9bd68fd9933f2a25ff195526864f5"
   */
  pk: string;
  /** Proof that a block corresponding to given header without PoW contains some transactions */
  proof?: ProofOfUpcomingTransactions;
}

export interface Peer {
  /** @example "127.0.0.1:5673" */
  address: string;
  /** @example "https://example.com" */
  restApiUrl?: string | null;
  /** @example "mynode" */
  name?: string | null;
  /** Basic timestamp definition */
  lastSeen?: Timestamp;
  connectionType?: "Incoming" | "Outgoing" | null;
}

export interface PeersStatus {
  lastIncomingMessage: Timestamp;
  currentNetworkTime: Timestamp;
}

export interface PeerMode {
  /** @example "utxo" */
  state: string;
  /** @example true */
  verifyingTransactions: boolean;
  /** @example 2880 */
  fullBlocksSuffix: number;
}

export interface SyncInfo {
  /** @example "127.0.0.1:5673" */
  address: string;
  /** Peer operating mode parameters */
  mode: PeerMode;
  /** @example "4.0.16" */
  version: string;
  /** @example "Older" */
  status: string;
  /** @example 65780 */
  height: number;
}

export interface RequestedInfo {
  /** @example "127.0.0.1:5673" */
  address?: string;
  /** @example "4.0.26" */
  version?: string;
  /**
   * How many times we checked for modifier delivery status
   * @example 4
   */
  checks: number;
}

export type RequestedInfoByModifierId = Record<string, RequestedInfo>;

export interface ConnectedPeer {
  /** @example "127.0.0.1:5673" */
  address: string;
  /** @example "4.0.26" */
  version?: string;
  /** Basic timestamp definition */
  lastMessage?: Timestamp;
}

export type ConnectedPeerByModifierId = Record<string, ConnectedPeer>;

export interface TrackInfo {
  /** @example 65780 */
  invalidModifierApproxSize: number;
  /** Currently requested modifiers */
  requested: Record<string, RequestedInfoByModifierId>;
  /** Received modifiers */
  received: Record<string, ConnectedPeerByModifierId>;
}

export interface BlacklistedPeers {
  addresses: string[];
}

/** Data container for /info API request output. Contains information about node's state and configuration. Contains data about best block, best header, state, etc. Best block is the block with the maximum height. */
export interface NodeInfo {
  /**
   * Node's (peer) self-chosen name from config
   * @example "my-node-1"
   */
  name: string;
  /**
   * Node's application version
   * @example "0.0.1"
   */
  appVersion: string;
  /**
   * Height of the best block known to the node. Can be 'null' if state is empty (no full block is applied since node launch)
   * @format int32
   * @min 0
   * @example 667
   */
  fullHeight: number | null;
  /**
   * The height of the best header (i.e. the one with the maximum height). Can be 'null' if state is empty (no header applied since node launch)
   * @format int32
   * @min 0
   * @example 667
   */
  headersHeight: number | null;
  /**
   * Maximum block height of connected peers. Can be 'null' if state is empty (no peer connected since node launch)
   * @format int32
   * @min 0
   * @example 706162
   */
  maxPeerHeight: number | null;
  /** Best full-block id (header id of such block). Can be 'null' if no full block is applied since node launch. */
  bestFullHeaderId: ModifierId | null;
  /** Header id of the parent block of the best full-block (i.e. previous block in the blockchain). Can be 'null' if no full block is applied since node launch */
  previousFullHeaderId: ModifierId | null;
  /** Best header ID (hex representation). Can be 'null' if no header applied since node launch. */
  bestHeaderId: ModifierId | null;
  /**
   * Current UTXO set digest. Can be 'null' if state is empty (no full block is applied since node launch)
   * @example "dab9da11fc216660e974842cc3b7705e62ebb9e0bf5ff78e53f9cd40abadd117"
   */
  stateRoot: string | null;
  /** Whether the node is storing UTXO set or only its digest. Equals `digest` if only digest is stored, `utxo` if full UTXO set is stored. */
  stateType: "digest" | "utxo";
  /**
   * Id of a block where UTXO set digest is taken from. Can be 'null' if no full block is applied since node launch.
   * @example "fab9da11fc216660e974842cc3b7705e62ebb9e0bf5ff78e53f9cd40abadd117"
   */
  stateVersion: string | null;
  /**
   * Whether the node is mining (i.e. generating blocks).
   * @example true
   */
  isMining: boolean;
  /**
   * Number of peers this node is connected with.
   * @format int32
   * @min 0
   * @example 327
   */
  peersCount: number;
  /**
   * Number of unconfirmed transactions in the mempool.
   * @format int32
   * @min 0
   * @max 10000
   * @example 327
   */
  unconfirmedCount: number;
  /**
   * Difficulty on current bestFullHeaderId. Can be 'null' if no full block is applied since node launch. Difficulty is a BigInt integer.
   * @min 0
   * @example 667
   */
  difficulty: number | null;
  /** Current internal node time */
  currentTime: Timestamp;
  /** When the node was launched (in Java time format, UNIX time * 1000). */
  launchTime: Timestamp;
  /** Cumulative difficulty of best headers-chain. Can be 'null' if no headers is applied since node launch. headersScore is a BigInt integer. */
  headersScore: number | null;
  /** Cumulative difficulty of best full blocks chain. Can be 'null' if no full block is applied since node launch. fullBlocksScore is a BigInt integer. */
  fullBlocksScore: number | null;
  /** Header id of genesis block. Can be 'null' if genesis blocks is not produced yet. */
  genesisBlockId: ModifierId | null;
  /** System parameters which could be readjusted via collective miners decision. */
  parameters: Params;
  /**
   * Whether EIP-27 locked in
   * @example true
   */
  eip27Supported?: boolean;
  /**
   * Publicly accessible url of node which exposes restApi in firewall
   * @example "https://example.com"
   */
  restApiUrl?: string;
}

/** System parameters which could be readjusted via collective miners decision. */
export interface Params {
  /**
   * Height when current parameters were considered(not actual height). Can be '0' if state is empty
   * @format int32
   * @min 0
   * @example 667
   */
  height: number;
  /**
   * Storage fee coefficient (per byte per storage period ~4 years)
   * @format int32
   * @min 0
   * @example 100000
   */
  storageFeeFactor: number;
  /**
   * Minimum value per byte of an output
   * @format int32
   * @min 0
   * @example 360
   */
  minValuePerByte: number;
  /**
   * Maximum block size (in bytes)
   * @format int32
   * @min 0
   * @example 1048576
   */
  maxBlockSize: number;
  /**
   * Maximum cumulative computational cost of input scripts in block transactions
   * @format int32
   * @min 0
   * @example 104876
   */
  maxBlockCost: number;
  /** Ergo blockchain protocol version */
  blockVersion: Version;
  /**
   * Validation cost of a single token
   * @format int32
   * @min 0
   * @example 100
   */
  tokenAccessCost: number;
  /**
   * Validation cost per one transaction input
   * @format int32
   * @min 0
   * @example 100
   */
  inputCost: number;
  /**
   * Validation cost per one data input
   * @format int32
   * @min 0
   * @example 100
   */
  dataInputCost: number;
  /**
   * Validation cost per one transaction output
   * @format int32
   * @min 0
   * @example 100
   */
  outputCost: number;
}

/**
 * Ergo blockchain protocol version
 * @format int8
 * @example 2
 */
export type Version = number;

/**
 * Base16-encoded transaction box id bytes. Should be 32 bytes long
 * @format base16
 * @example "1ab9da11fc216660e974842cc3b7705e62ebb9e0bf5ff78e53f9cd40abadd117"
 */
export type TransactionBoxId = string;

/**
 * Base16-encoded transaction id bytes
 * @format base16
 * @example "2ab9da11fc216660e974842cc3b7705e62ebb9e0bf5ff78e53f9cd40abadd117"
 */
export type TransactionId = string;

/**
 * Base16-encoded ergo tree bytes
 * @format base16
 * @example "0008cd0336100ef59ced80ba5f89c4178ebd57b6c1dd0f3d135ee1db9f62fc634d637041"
 */
export type ErgoTree = string;

export interface ErgoTreeObject {
  /**
   * serialized Ergo tree
   * @example "02a7955281885bf0f0ca4a48678848cad8dc5b328ce8bc1d4481d041c98e891ff3"
   */
  tree?: string;
}

/** List of ErgoTransaction objects */
export type Transactions = ErgoTransaction[];

/** Fee histogram bin */
export interface FeeHistogramBin {
  /** @format int32 */
  nTxns?: number;
  /** @format int64 */
  totalFee?: number;
}

/** Fee histogram for transactions in mempool */
export type FeeHistogram = FeeHistogramBin[];

/** Token detail in the transaction */
export interface Asset {
  /** Base16-encoded 32 byte digest */
  tokenId: Digest32;
  /**
   * Amount of the token
   * @format int64
   * @example 1000
   */
  amount: number;
}

/**
 * Ergo box registers
 * @example {"R4":"100204a00b08cd0336100ef59ced80ba5f89c4178ebd57b6c1dd0f3d135ee1db9f62fc634d637041ea02d192a39a8cc7a70173007301"}
 */
export type Registers = Record<string, SValue>;

/**
 * Base-16 encoded serialized Sigma-state value
 * @format base16
 * @example "100204a00b08cd0336100ef59ced80ba5f89c4178ebd57b6c1dd0f3d135ee1db9f62fc634d637041ea02d192a39a8cc7a70173007301"
 */
export type SValue = string;

/**
 * Base16-encoded votes for a soft-fork and parameters
 * @format base16
 * @example "000000"
 */
export type Votes = string;

/**
 * Base16-encoded 32 byte modifier id
 * @format base16
 * @example "3ab9da11fc216660e974842cc3b7705e62ebb9e0bf5ff78e53f9cd40abadd117"
 */
export type ModifierId = string;

/**
 * Base16-encoded 32 byte digest
 * @format base16
 * @example "4ab9da11fc216660e974842cc3b7705e62ebb9e0bf5ff78e53f9cd40abadd117"
 */
export type Digest32 = string;

/**
 * Base16-encoded bytes
 * @format base16
 * @example "4ab9da11fc216660e974842cc3b7705e62ebb9e0bf5ff78e53f9cd40abadd117"
 */
export type HexString = string;

/**
 * Base16-encoded 33 byte digest - digest with extra byte with tree height
 * @format base16
 * @example "333ab9da11fc216660e974842cc3b7705e62ebb9e0bf5ff78e53f9cd40abadd117"
 */
export type ADDigest = string;

/**
 * Base16-encoded ad proofs
 * @format base16
 * @example "3ab9da11fc216660e974842cc3b7705e62ebb9e0bf5ff78e53f9cd40abadd1173ab9da11fc216660e974842cc3b7705e62ebb9e0bf5ff78e53f9cd40abadd1173ab9da11fc216660e974842cc3b7705e62ebb9e0bf5ff78e53f9cd40abadd117"
 */
export type SerializedAdProof = string;

/**
 * Base16-encoded spending proofs
 * @format base16
 * @example "4ab9da11fc216660e974842cc3b7705e62ebb9e0bf5ff78e53f9cd40abadd1173ab9da11fc216660e974842cc3b7705e62ebb9e0bf5ff78e53f9cd40abadd1173ab9da11fc216660e974842cc3b7705e62ebb9e0bf5ff78e53f9cd40abadd117"
 */
export type SpendingProofBytes = string;

/**
 * Base16-encoded block signature
 * @format base16
 * @example "5ab9da11fc216660e974842cc3b7705e62ebb9e0bf5ff78e53f9cd40abadd117"
 */
export type BlockSignature = string;

/**
 * Basic timestamp definition
 * @format int64
 * @example 1524143059077
 */
export type Timestamp = number;

/** Emission info for height */
export interface EmissionInfo {
  /** @format int64 */
  minerReward?: number;
  /** @format int64 */
  totalCoinsIssued?: number;
  /** @format int64 */
  totalRemainCoins?: number;
  /** @format int64 */
  reemitted?: number;
}

/** Emission related scripts */
export interface EmissionScripts {
  emission?: string;
  reemission?: string;
  pay2Reemission?: string;
}

/** Amount of Ergo tokens and assets */
export interface BalancesSnapshot {
  /** @format int32 */
  height: number;
  /** @format int64 */
  balance: number;
  assets?: Asset[];
}

/** Validity status of Ergo address */
export interface AddressValidity {
  /** Encoded Ergo Address */
  address: ErgoAddress;
  isValid: boolean;
  error?: string;
}

/** Error response from API */
export interface ApiError {
  /**
   * Error code
   * @example 500
   */
  error: number;
  /**
   * Error message explaining the reason of the error
   * @example "Internal server error"
   */
  reason: string;
  /** Detailed error description */
  detail: string | null;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "/";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.Text]: (input: any) => (input !== null && typeof input !== "string" ? JSON.stringify(input) : input),
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      signal: (cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal) || null,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response.clone() as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title Ergo Node API
 * @version 5.0.24
 * @license CC0 1.0 Universal (https://raw.githubusercontent.com/ergoplatform/ergo/master/LICENSE)
 * @baseUrl /
 * @contact Ergo Platform Team <ergoplatform@protonmail.com> (https://ergoplatform.org)
 *
 * API docs for Ergo Node. Models are shared between all Ergo products
 */
export class ErgoApi<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  blocks = {
    /**
     * No description
     *
     * @tags blocks
     * @name GetHeaderIds
     * @summary Get an array of header ids (hex encoded) for the given range of blockchain block heights. Returns a page of the whole list starting from `offset` and containing `limit` items.
     * @request GET:/blocks
     */
    getHeaderIds: (
      query?: {
        /**
         * The number of items in list to return
         * @format int32
         * @min 10
         * @max 100
         * @default 50
         */
        limit?: number;
        /**
         * The first block height to include in the list
         * @format int32
         * @default 0
         */
        offset?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<string[], ApiError>({
        path: `/blocks`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags blocks
     * @name SendMinedBlock
     * @summary Send a mined block
     * @request POST:/blocks
     */
    sendMinedBlock: (data: FullBlock, params: RequestParams = {}) =>
      this.request<void, ApiError>({
        path: `/blocks`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags blocks
     * @name GetFullBlockAt
     * @summary Get header ids at the given height
     * @request GET:/blocks/at/{blockHeight}
     */
    getFullBlockAt: (blockHeight: number, params: RequestParams = {}) =>
      this.request<string[], ApiError>({
        path: `/blocks/at/${blockHeight}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags blocks
     * @name GetChainSlice
     * @summary Get headers in a specified range of heights
     * @request GET:/blocks/chainSlice
     */
    getChainSlice: (
      query?: {
        /**
         * Min header height (start of the range)
         * @format int32
         * @default 0
         */
        fromHeight?: number;
        /**
         * Max header height of the range (last header height then omitted)
         * @format int32
         * @default -1
         */
        toHeight?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<BlockHeader[], ApiError>({
        path: `/blocks/chainSlice`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags blocks
     * @name GetFullBlockById
     * @summary Get the full block info by a given header id
     * @request GET:/blocks/{headerId}
     */
    getFullBlockById: (headerId: string, params: RequestParams = {}) =>
      this.request<FullBlock, ApiError>({
        path: `/blocks/${headerId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags blocks
     * @name GetFullBlockByIds
     * @summary Get full blocks by given header ids
     * @request POST:/blocks/headerIds
     */
    getFullBlockByIds: (data: string[], params: RequestParams = {}) =>
      this.request<FullBlock[], ApiError>({
        path: `/blocks/headerIds`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags blocks
     * @name GetBlockHeaderById
     * @summary Get the block header info by a given header id
     * @request GET:/blocks/{headerId}/header
     */
    getBlockHeaderById: (headerId: string, params: RequestParams = {}) =>
      this.request<BlockHeader, ApiError>({
        path: `/blocks/${headerId}/header`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags blocks
     * @name GetBlockTransactionsById
     * @summary Get the block transactions info by a given signature
     * @request GET:/blocks/{headerId}/transactions
     */
    getBlockTransactionsById: (headerId: string, params: RequestParams = {}) =>
      this.request<BlockTransactions, ApiError>({
        path: `/blocks/${headerId}/transactions`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags blocks
     * @name GetProofForTx
     * @summary Get Merkle proof for transaction
     * @request GET:/blocks/{headerId}/proofFor/{txId}
     */
    getProofForTx: (headerId: string, txId: string, params: RequestParams = {}) =>
      this.request<MerkleProof, ApiError>({
        path: `/blocks/${headerId}/proofFor/${txId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags blocks
     * @name GetLastHeaders
     * @summary Get the last headers objects
     * @request GET:/blocks/lastHeaders/{count}
     */
    getLastHeaders: (count: number, params: RequestParams = {}) =>
      this.request<BlockHeader[], ApiError>({
        path: `/blocks/lastHeaders/${count}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags blocks
     * @name GetModifierById
     * @summary Get the persistent modifier by its id
     * @request GET:/blocks/modifier/{modifierId}
     */
    getModifierById: (modifierId: string, params: RequestParams = {}) =>
      this.request<void, ApiError>({
        path: `/blocks/modifier/${modifierId}`,
        method: "GET",
        ...params,
      }),
  };
  nipopow = {
    /**
     * No description
     *
     * @tags nipopow
     * @name GetPopowHeaderById
     * @summary Construct PoPow header according to given header id
     * @request GET:/nipopow/popowHeaderById/{headerId}
     */
    getPopowHeaderById: (headerId: string, params: RequestParams = {}) =>
      this.request<PopowHeader, ApiError>({
        path: `/nipopow/popowHeaderById/${headerId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags nipopow
     * @name GetPopowHeaderByHeight
     * @summary Construct PoPow header for best header at given height
     * @request GET:/nipopow/popowHeaderByHeight/{height}
     */
    getPopowHeaderByHeight: (height: number, params: RequestParams = {}) =>
      this.request<PopowHeader, ApiError>({
        path: `/nipopow/popowHeaderByHeight/${height}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags nipopow
     * @name GetPopowProof
     * @summary Construct PoPoW proof for given min superchain length and suffix length
     * @request GET:/nipopow/proof/{minChainLength}/{suffixLength}
     */
    getPopowProof: (minChainLength: number, suffixLength: number, params: RequestParams = {}) =>
      this.request<NipopowProof, ApiError>({
        path: `/nipopow/proof/${minChainLength}/${suffixLength}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags nipopow
     * @name GetPopowProofByHeaderId
     * @summary Construct PoPoW proof for given min superchain length, suffix length and header ID
     * @request GET:/nipopow/proof/{minChainLength}/{suffixLength}/{headerId}
     */
    getPopowProofByHeaderId: (
      minChainLength: number,
      suffixLength: number,
      headerId: string,
      params: RequestParams = {},
    ) =>
      this.request<NipopowProof, ApiError>({
        path: `/nipopow/proof/${minChainLength}/${suffixLength}/${headerId}`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  info = {
    /**
     * No description
     *
     * @tags info
     * @name GetNodeInfo
     * @summary Get the information about the Node
     * @request GET:/info
     */
    getNodeInfo: (params: RequestParams = {}) =>
      this.request<NodeInfo, ApiError>({
        path: `/info`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  transactions = {
    /**
     * No description
     *
     * @tags transactions
     * @name SendTransaction
     * @summary Submit an Ergo transaction to unconfirmed pool to send it over the network
     * @request POST:/transactions
     */
    sendTransaction: (data: ErgoTransaction, params: RequestParams = {}) =>
      this.request<TransactionId, ApiError>({
        path: `/transactions`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags transactions
     * @name SendTransactionAsBytes
     * @summary Submit an Ergo transaction given as hex-encoded transaction bytes to unconfirmed pool to send it over the network
     * @request POST:/transactions/bytes
     */
    sendTransactionAsBytes: (data: ErgoAddress, params: RequestParams = {}) =>
      this.request<TransactionId, ApiError>({
        path: `/transactions/bytes`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags transactions
     * @name CheckTransaction
     * @summary Checks an Ergo transaction without sending it over the network. Checks that transaction is valid and its inputs are in the UTXO set. Returns transaction identifier if the transaction is passing the checks.
     * @request POST:/transactions/check
     */
    checkTransaction: (data: ErgoTransaction, params: RequestParams = {}) =>
      this.request<TransactionId, ApiError>({
        path: `/transactions/check`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags transactions
     * @name CheckTransactionAsBytes
     * @summary Checks an Ergo transaction without sending it over the network given in form of hex-encoded transaction bytes. Checks that transaction is valid and its inputs are in the UTXO set. Returns transaction identifier if the transaction is passing the checks.
     * @request POST:/transactions/checkBytes
     */
    checkTransactionAsBytes: (data: ErgoAddress, params: RequestParams = {}) =>
      this.request<TransactionId, ApiError>({
        path: `/transactions/checkBytes`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags transactions
     * @name GetUnconfirmedTransactions
     * @summary Get current pool of the unconfirmed transactions pool
     * @request GET:/transactions/unconfirmed
     */
    getUnconfirmedTransactions: (
      query?: {
        /**
         * The number of items in list to return
         * @format int32
         * @min 10
         * @max 100
         * @default 50
         */
        limit?: number;
        /**
         * The number of items in list to skip
         * @format int32
         * @default 0
         */
        offset?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<Transactions, ApiError>({
        path: `/transactions/unconfirmed`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags transactions
     * @name CheckUnconfirmedTransaction
     * @summary Check if given transaction is unconfirmed in pool
     * @request HEAD:/transactions/unconfirmed/{txId}
     */
    checkUnconfirmedTransaction: (txId: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/transactions/unconfirmed/${txId}`,
        method: "HEAD",
        ...params,
      }),

    /**
     * No description
     *
     * @tags transactions
     * @name GetUnconfirmedTransactionById
     * @summary Get unconfirmed transaction from pool
     * @request GET:/transactions/unconfirmed/byTransactionId/{txId}
     */
    getUnconfirmedTransactionById: (txId: string, params: RequestParams = {}) =>
      this.request<ErgoTransaction, ApiError>({
        path: `/transactions/unconfirmed/byTransactionId/${txId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags transactions
     * @name GetUnconfirmedTransactionsByErgoTree
     * @summary Finds unconfirmed transactions by ErgoTree hex of one of its output or input boxes (if present in UtxoState)
     * @request POST:/transactions/unconfirmed/byErgoTree
     */
    getUnconfirmedTransactionsByErgoTree: (
      data: ErgoAddress,
      query?: {
        /**
         * The number of items in list to return
         * @format int32
         * @min 10
         * @max 100
         * @default 50
         */
        limit?: number;
        /**
         * The number of items in list to skip
         * @format int32
         * @default 0
         */
        offset?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<Transactions, ApiError>({
        path: `/transactions/unconfirmed/byErgoTree`,
        method: "POST",
        query: query,
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags inputs
     * @name GetUnconfirmedTransactionInputBoxById
     * @summary Get input box from unconfirmed transactions in pool
     * @request GET:/transactions/unconfirmed/inputs/byBoxId/{boxId}
     */
    getUnconfirmedTransactionInputBoxById: (boxId: string, params: RequestParams = {}) =>
      this.request<ErgoTransactionOutput, ApiError>({
        path: `/transactions/unconfirmed/inputs/byBoxId/${boxId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags outputs
     * @name GetUnconfirmedTransactionOutputBoxById
     * @summary Get output box from unconfirmed transactions in pool
     * @request GET:/transactions/unconfirmed/outputs/byBoxId/{boxId}
     */
    getUnconfirmedTransactionOutputBoxById: (boxId: string, params: RequestParams = {}) =>
      this.request<ErgoTransactionOutput, ApiError>({
        path: `/transactions/unconfirmed/outputs/byBoxId/${boxId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags outputs
     * @name GetUnconfirmedTransactionOutputBoxesByErgoTree
     * @summary Finds all output boxes by ErgoTree hex among unconfirmed transactions
     * @request POST:/transactions/unconfirmed/outputs/byErgoTree
     */
    getUnconfirmedTransactionOutputBoxesByErgoTree: (
      data: ErgoAddress,
      query?: {
        /**
         * The number of items in list to return
         * @format int32
         * @min 10
         * @max 100
         * @default 50
         */
        limit?: number;
        /**
         * The number of items in list to skip
         * @format int32
         * @default 0
         */
        offset?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<ErgoTransactionOutput[], ApiError>({
        path: `/transactions/unconfirmed/outputs/byErgoTree`,
        method: "POST",
        query: query,
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags outputs
     * @name GetUnconfirmedTransactionOutputBoxesByTokenId
     * @summary Get output box from unconfirmed transactions in pool by tokenId
     * @request GET:/transactions/unconfirmed/outputs/byTokenId/{tokenId}
     */
    getUnconfirmedTransactionOutputBoxesByTokenId: (tokenId: string, params: RequestParams = {}) =>
      this.request<ErgoTransactionOutput[], ApiError>({
        path: `/transactions/unconfirmed/outputs/byTokenId/${tokenId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags outputs
     * @name GetUnconfirmedTransactionOutputBoxesByRegisters
     * @summary Finds all output boxes among unconfirmed transactions that contain given registers
     * @request POST:/transactions/unconfirmed/outputs/byRegisters
     */
    getUnconfirmedTransactionOutputBoxesByRegisters: (
      data: Registers,
      query?: {
        /**
         * The number of items in list to return
         * @format int32
         * @min 10
         * @max 100
         * @default 50
         */
        limit?: number;
        /**
         * The number of items in list to skip
         * @format int32
         * @default 0
         */
        offset?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<ErgoTransactionOutput[], ApiError>({
        path: `/transactions/unconfirmed/outputs/byRegisters`,
        method: "POST",
        query: query,
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags transactions
     * @name GetFeeHistogram
     * @summary Get histogram (waittime, (n_trans, sum(fee)) for transactions in mempool. It contains "bins"+1 bins, where i-th elements corresponds to transaction with wait time [i*maxtime/bins, (i+1)*maxtime/bins), and last bin corresponds to the transactions with wait time >= maxtime.
     * @request GET:/transactions/poolHistogram
     */
    getFeeHistogram: (
      query?: {
        /**
         * The number of bins in histogram
         * @format int32
         * @min 1
         * @default 10
         */
        bins?: number;
        /**
         * Maximal wait time in milliseconds
         * @format int64
         * @min 0
         * @default 60000
         */
        maxtime?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<FeeHistogram, ApiError>({
        path: `/transactions/poolHistogram`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags transactions
     * @name GetRecommendedFee
     * @summary Get recommended fee (in nanoErgs) for a transaction with specified size (in bytes) to be proceeded in specified time (in minutes)
     * @request GET:/transactions/getFee
     */
    getRecommendedFee: (
      query: {
        /**
         * Maximum transaction wait time in minutes
         * @format int32
         * @min 1
         * @default 1
         */
        waitTime: number;
        /**
         * Transaction size
         * @format int32
         * @min 1
         * @default 100
         */
        txSize: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<Version, ApiError>({
        path: `/transactions/getFee`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags transactions
     * @name GetExpectedWaitTime
     * @summary Get expected wait time for the transaction with specified fee and size
     * @request GET:/transactions/waitTime
     */
    getExpectedWaitTime: (
      query: {
        /**
         * Transaction fee (in nanoErgs)
         * @format int32
         * @min 1
         * @default 1
         */
        fee: number;
        /**
         * Transaction size
         * @format int32
         * @min 1
         * @default 100
         */
        txSize: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<Version, ApiError>({
        path: `/transactions/waitTime`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
  peers = {
    /**
     * No description
     *
     * @tags peers
     * @name GetAllPeers
     * @summary Get all known peers
     * @request GET:/peers/all
     */
    getAllPeers: (params: RequestParams = {}) =>
      this.request<Peer[], ApiError>({
        path: `/peers/all`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags peers
     * @name GetConnectedPeers
     * @summary Get current connected peers
     * @request GET:/peers/connected
     */
    getConnectedPeers: (params: RequestParams = {}) =>
      this.request<Peer[], ApiError>({
        path: `/peers/connected`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags peers
     * @name ConnectToPeer
     * @summary Add address to peers list
     * @request POST:/peers/connect
     * @secure
     */
    connectToPeer: (data: ErgoAddress, params: RequestParams = {}) =>
      this.request<void, ApiError>({
        path: `/peers/connect`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags peers
     * @name GetBlacklistedPeers
     * @summary Get blacklisted peers
     * @request GET:/peers/blacklisted
     */
    getBlacklistedPeers: (params: RequestParams = {}) =>
      this.request<BlacklistedPeers, ApiError>({
        path: `/peers/blacklisted`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags peers
     * @name GetPeersStatus
     * @summary Get last incoming message timestamp and current network time
     * @request GET:/peers/status
     */
    getPeersStatus: (params: RequestParams = {}) =>
      this.request<PeersStatus[], ApiError>({
        path: `/peers/status`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags peers
     * @name GetPeersSyncInfo
     * @summary Get sync info reported by peers, including versions, current status and height (if available)
     * @request GET:/peers/syncInfo
     */
    getPeersSyncInfo: (params: RequestParams = {}) =>
      this.request<SyncInfo[], ApiError>({
        path: `/peers/syncInfo`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags peers
     * @name GetPeersTrackInfo
     * @summary Get track info reported by peers, including count of invalid modifiers and details of requested and received modifiers
     * @request GET:/peers/trackInfo
     */
    getPeersTrackInfo: (params: RequestParams = {}) =>
      this.request<TrackInfo[], ApiError>({
        path: `/peers/trackInfo`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  utils = {
    /**
     * No description
     *
     * @tags utils
     * @name GetRandomSeed
     * @summary Get random seed of 32 bytes
     * @request GET:/utils/seed
     */
    getRandomSeed: (params: RequestParams = {}) =>
      this.request<ErgoAddress, ApiError>({
        path: `/utils/seed`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags utils
     * @name CheckAddressValidityWithGet
     * @summary Check address validity (prefer POST request as addresses can be too big)
     * @request GET:/utils/address/{address}
     */
    checkAddressValidityWithGet: (address: ErgoAddress, params: RequestParams = {}) =>
      this.request<AddressValidity, ApiError>({
        path: `/utils/address/${address}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags utils
     * @name CheckAddressValidity
     * @summary Checks address validity
     * @request POST:/utils/address
     */
    checkAddressValidity: (data: ErgoAddress, params: RequestParams = {}) =>
      this.request<AddressValidity, ApiError>({
        path: `/utils/address`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags utils
     * @name AddressToRaw
     * @summary Convert Pay-To-Public-Key Address to raw representation (hex-encoded serialized curve point)
     * @request GET:/utils/addressToRaw/{address}
     */
    addressToRaw: (address: ErgoAddress, params: RequestParams = {}) =>
      this.request<ErgoAddress, ApiError>({
        path: `/utils/addressToRaw/${address}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags utils
     * @name RawToAddress
     * @summary Generate Pay-To-Public-Key address from hex-encoded raw pubkey (secp256k1 serialized point)
     * @request GET:/utils/rawToAddress/{pubkeyHex}
     */
    rawToAddress: (pubkeyHex: string, params: RequestParams = {}) =>
      this.request<ErgoAddress, ApiError>({
        path: `/utils/rawToAddress/${pubkeyHex}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags utils
     * @name ErgoTreeToAddressWithGet
     * @summary Generate Ergo address from hex-encoded ErgoTree (prefer POST request as ErgoTree can be too big)
     * @request GET:/utils/ergoTreeToAddress/{ergoTreeHex}
     */
    ergoTreeToAddressWithGet: (ergoTreeHex: string, params: RequestParams = {}) =>
      this.request<ErgoAddress, ApiError>({
        path: `/utils/ergoTreeToAddress/${ergoTreeHex}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags utils
     * @name ErgoTreeToAddress
     * @summary Generate Ergo address from hex-encoded ErgoTree
     * @request POST:/utils/ergoTreeToAddress
     */
    ergoTreeToAddress: (data: ErgoAddress, params: RequestParams = {}) =>
      this.request<ErgoAddress, ApiError>({
        path: `/utils/ergoTreeToAddress`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags utils
     * @name GetRandomSeedWithLength
     * @summary Generate random seed of specified length in bytes
     * @request GET:/utils/seed/{length}
     */
    getRandomSeedWithLength: (length: string, params: RequestParams = {}) =>
      this.request<ErgoAddress, ApiError>({
        path: `/utils/seed/${length}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags utils
     * @name HashBlake2B
     * @summary Return Blake2b hash of specified message
     * @request POST:/utils/hash/blake2b
     */
    hashBlake2B: (data: ErgoAddress, params: RequestParams = {}) =>
      this.request<ErgoAddress, ApiError>({
        path: `/utils/hash/blake2b`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  wallet = {
    /**
     * No description
     *
     * @tags wallet
     * @name WalletInit
     * @summary Initialize new wallet with randomly generated seed
     * @request POST:/wallet/init
     * @secure
     */
    walletInit: (data: InitWallet, params: RequestParams = {}) =>
      this.request<InitWalletResult, ApiError>({
        path: `/wallet/init`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags wallet
     * @name WalletRestore
     * @summary Create new wallet from existing mnemonic seed
     * @request POST:/wallet/restore
     * @secure
     */
    walletRestore: (data: RestoreWallet, params: RequestParams = {}) =>
      this.request<void, ApiError>({
        path: `/wallet/restore`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags wallet
     * @name CheckSeed
     * @summary Check whether mnemonic phrase is corresponding to the wallet seed
     * @request POST:/wallet/check
     * @secure
     */
    checkSeed: (data: CheckWallet, params: RequestParams = {}) =>
      this.request<PassphraseMatch, ApiError>({
        path: `/wallet/check`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags wallet
     * @name WalletUnlock
     * @summary Unlock wallet
     * @request POST:/wallet/unlock
     * @secure
     */
    walletUnlock: (data: UnlockWallet, params: RequestParams = {}) =>
      this.request<void, ApiError>({
        path: `/wallet/unlock`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags wallet
     * @name WalletLock
     * @summary Lock wallet
     * @request GET:/wallet/lock
     * @secure
     */
    walletLock: (params: RequestParams = {}) =>
      this.request<void, ApiError>({
        path: `/wallet/lock`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags wallet
     * @name WalletRescan
     * @summary Rescan wallet (all the available full blocks). When fromHeight is set wallet would not see any boxes below it.
     * @request POST:/wallet/rescan
     * @secure
     */
    walletRescan: (
      data?: {
        /**
         * @format int32
         * @min 0
         */
        fromHeight: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, ApiError>({
        path: `/wallet/rescan`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags wallet
     * @name GetWalletStatus
     * @summary Get wallet status
     * @request GET:/wallet/status
     * @secure
     */
    getWalletStatus: (params: RequestParams = {}) =>
      this.request<WalletStatus, ApiError>({
        path: `/wallet/status`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags wallet
     * @name WalletUpdateChangeAddress
     * @summary Update address to be used to send change to
     * @request POST:/wallet/updateChangeAddress
     * @secure
     */
    walletUpdateChangeAddress: (data: ErgoAddress, params: RequestParams = {}) =>
      this.request<void, ApiError>({
        path: `/wallet/updateChangeAddress`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags wallet
     * @name WalletDeriveKey
     * @summary Derive new key according to a provided path
     * @request POST:/wallet/deriveKey
     * @secure
     */
    walletDeriveKey: (data: DeriveKey, params: RequestParams = {}) =>
      this.request<DeriveKeyResult, ApiError>({
        path: `/wallet/deriveKey`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags wallet
     * @name WalletDeriveNextKey
     * @summary Derive next key
     * @request GET:/wallet/deriveNextKey
     * @secure
     */
    walletDeriveNextKey: (params: RequestParams = {}) =>
      this.request<DeriveNextKeyResult, ApiError>({
        path: `/wallet/deriveNextKey`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags wallet
     * @name WalletBalances
     * @summary Get total amount of confirmed Ergo tokens and assets
     * @request GET:/wallet/balances
     * @secure
     */
    walletBalances: (params: RequestParams = {}) =>
      this.request<BalancesSnapshot, ApiError>({
        path: `/wallet/balances`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags wallet
     * @name WalletTransactions
     * @summary Get a list of all wallet-related transactions
     * @request GET:/wallet/transactions
     * @secure
     */
    walletTransactions: (
      query?: {
        /**
         * Minimal tx inclusion height
         * @format int32
         * @min 0
         */
        minInclusionHeight?: number;
        /**
         * Maximal tx inclusion height
         * @format int32
         * @min 0
         */
        maxInclusionHeight?: number;
        /**
         * Minimal confirmations number
         * @format int32
         * @min 0
         */
        minConfirmations?: number;
        /**
         * Maximal confirmations number
         * @format int32
         * @min 0
         */
        maxConfirmations?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<WalletTransaction[], ApiError>({
        path: `/wallet/transactions`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags wallet
     * @name WalletGetTransaction
     * @summary Get wallet-related transaction by id
     * @request GET:/wallet/transactionById
     * @secure
     */
    walletGetTransaction: (
      query: {
        /** Transaction id */
        id: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<WalletTransaction[], ApiError>({
        path: `/wallet/transactionById`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags wallet
     * @name WalletTransactionsByScanId
     * @summary Get scan-related transactions by scan id
     * @request GET:/wallet/transactionsByScanId/{scanId}
     * @secure
     */
    walletTransactionsByScanId: (
      scanId: number,
      query?: {
        /**
         * Minimal tx inclusion height
         * @format int32
         * @min 0
         */
        minInclusionHeight?: number;
        /**
         * Maximal tx inclusion height
         * @format int32
         * @min 0
         */
        maxInclusionHeight?: number;
        /**
         * Minimal confirmations number
         * @format int32
         * @min 0
         */
        minConfirmations?: number;
        /**
         * Maximal confirmations number
         * @format int32
         * @min 0
         */
        maxConfirmations?: number;
        /**
         * Include transactions from mempool
         * @default false
         */
        includeUnconfirmed?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<WalletTransaction[], ApiError>({
        path: `/wallet/transactionsByScanId/${scanId}`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags wallet
     * @name WalletBoxes
     * @summary Get a list of all wallet-related boxes, both spent and unspent. Set minConfirmations to -1 to get mempool boxes included.
     * @request GET:/wallet/boxes
     * @secure
     */
    walletBoxes: (
      query?: {
        /**
         * Minimal number of confirmations, -1 means we consider unconfirmed
         * @format int32
         * @min -1
         * @default 0
         */
        minConfirmations?: number;
        /**
         * Maximum number of confirmations, -1 means unlimited
         * @format int32
         * @default -1
         */
        maxConfirmations?: number;
        /**
         * Minimal box inclusion height
         * @format int32
         * @min 0
         * @default 0
         */
        minInclusionHeight?: number;
        /**
         * Maximum box inclusion height, -1 means unlimited
         * @format int32
         * @default -1
         */
        maxInclusionHeight?: number;
        /**
         * amount of elements to retrieve
         * @format int32
         * @min 1
         * @max 2500
         * @default 500
         */
        limit?: number;
        /**
         * The number of items in list to skip
         * @format int32
         * @min 0
         * @default 0
         */
        offset?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<WalletBox[], ApiError>({
        path: `/wallet/boxes`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags wallet
     * @name WalletBoxesCollect
     * @summary Get a list of collected boxes.
     * @request POST:/wallet/boxes/collect
     * @secure
     */
    walletBoxesCollect: (data: BoxesRequestHolder, params: RequestParams = {}) =>
      this.request<WalletBox[], ApiError>({
        path: `/wallet/boxes/collect`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags wallet
     * @name WalletUnspentBoxes
     * @summary Get a list of unspent boxes. Set minConfirmations to -1 to have mempool boxes considered.
     * @request GET:/wallet/boxes/unspent
     * @secure
     */
    walletUnspentBoxes: (
      query?: {
        /**
         * Minimal number of confirmations, -1 means we consider unconfirmed
         * @format int32
         * @min -1
         * @default 0
         */
        minConfirmations?: number;
        /**
         * Maximum number of confirmations, -1 means unlimited
         * @format int32
         * @default -1
         */
        maxConfirmations?: number;
        /**
         * Minimal box inclusion height
         * @format int32
         * @min 0
         * @default 0
         */
        minInclusionHeight?: number;
        /**
         * Maximum box inclusion height, -1 means unlimited
         * @format int32
         * @default -1
         */
        maxInclusionHeight?: number;
        /**
         * amount of elements to retrieve
         * @format int32
         * @min 1
         * @max 2500
         * @default 500
         */
        limit?: number;
        /**
         * The number of items in list to skip
         * @format int32
         * @min 0
         * @default 0
         */
        offset?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<WalletBox[], ApiError>({
        path: `/wallet/boxes/unspent`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags wallet
     * @name WalletBalancesUnconfirmed
     * @summary Get summary amount of confirmed plus unconfirmed Ergo tokens and assets
     * @request GET:/wallet/balances/withUnconfirmed
     * @secure
     */
    walletBalancesUnconfirmed: (params: RequestParams = {}) =>
      this.request<BalancesSnapshot, ApiError>({
        path: `/wallet/balances/withUnconfirmed`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags wallet
     * @name WalletAddresses
     * @summary Get wallet addresses
     * @request GET:/wallet/addresses
     * @secure
     */
    walletAddresses: (params: RequestParams = {}) =>
      this.request<ErgoAddress[], ApiError>({
        path: `/wallet/addresses`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags wallet
     * @name WalletTransactionGenerate
     * @summary Generate arbitrary transaction from array of requests.
     * @request POST:/wallet/transaction/generate
     * @secure
     */
    walletTransactionGenerate: (data: RequestsHolder, params: RequestParams = {}) =>
      this.request<ErgoTransaction, ApiError>({
        path: `/wallet/transaction/generate`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags wallet
     * @name WalletUnsignedTransactionGenerate
     * @summary Generate unsigned transaction from array of requests.
     * @request POST:/wallet/transaction/generateUnsigned
     * @secure
     */
    walletUnsignedTransactionGenerate: (data: RequestsHolder, params: RequestParams = {}) =>
      this.request<UnsignedErgoTransaction, ApiError>({
        path: `/wallet/transaction/generateUnsigned`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags wallet
     * @name WalletTransactionSign
     * @summary Sign arbitrary unsigned transaction with wallet secrets and also secrets provided.
     * @request POST:/wallet/transaction/sign
     * @secure
     */
    walletTransactionSign: (data: TransactionSigningRequest, params: RequestParams = {}) =>
      this.request<ErgoTransaction, ApiError>({
        path: `/wallet/transaction/sign`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags wallet
     * @name WalletTransactionGenerateAndSend
     * @summary Generate and send arbitrary transaction
     * @request POST:/wallet/transaction/send
     * @secure
     */
    walletTransactionGenerateAndSend: (data: RequestsHolder, params: RequestParams = {}) =>
      this.request<TransactionId, ApiError>({
        path: `/wallet/transaction/send`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags wallet
     * @name WalletPaymentTransactionGenerateAndSend
     * @summary Generate and send payment transaction (default fee of 0.001 Erg is used)
     * @request POST:/wallet/payment/send
     * @secure
     */
    walletPaymentTransactionGenerateAndSend: (data: PaymentRequest[], params: RequestParams = {}) =>
      this.request<TransactionId, ApiError>({
        path: `/wallet/payment/send`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags wallet
     * @name WalletGetPrivateKey
     * @summary Get the private key corresponding to a known address
     * @request POST:/wallet/getPrivateKey
     * @secure
     */
    walletGetPrivateKey: (data: PrivateKeyRequest, params: RequestParams = {}) =>
      this.request<DlogSecret, ApiError>({
        path: `/wallet/getPrivateKey`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags wallet
     * @name GenerateCommitments
     * @summary Generate signature commitments for inputs of an unsigned transaction
     * @request POST:/wallet/generateCommitments
     * @secure
     */
    generateCommitments: (data: GenerateCommitmentsRequest, params: RequestParams = {}) =>
      this.request<TransactionHintsBag, ApiError>({
        path: `/wallet/generateCommitments`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags wallet
     * @name ExtractHints
     * @summary Extract hints from a transaction
     * @request POST:/wallet/extractHints
     * @secure
     */
    extractHints: (data: HintExtractionRequest, params: RequestParams = {}) =>
      this.request<TransactionHintsBag, ApiError>({
        path: `/wallet/extractHints`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  mining = {
    /**
     * No description
     *
     * @tags mining
     * @name MiningRequestBlockCandidate
     * @summary Request block candidate
     * @request GET:/mining/candidate
     * @secure
     */
    miningRequestBlockCandidate: (params: RequestParams = {}) =>
      this.request<WorkMessage, ApiError>({
        path: `/mining/candidate`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags mining
     * @name MiningRequestBlockCandidateWithMandatoryTransactions
     * @summary Request block candidate
     * @request POST:/mining/candidateWithTxs
     * @secure
     */
    miningRequestBlockCandidateWithMandatoryTransactions: (data: Transactions, params: RequestParams = {}) =>
      this.request<WorkMessage, ApiError>({
        path: `/mining/candidateWithTxs`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags mining
     * @name MiningReadMinerRewardAddress
     * @summary Read miner reward address
     * @request GET:/mining/rewardAddress
     * @secure
     */
    miningReadMinerRewardAddress: (params: RequestParams = {}) =>
      this.request<RewardAddress, ApiError>({
        path: `/mining/rewardAddress`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags mining
     * @name MiningReadMinerRewardPubkey
     * @summary Read public key associated with miner rewards
     * @request GET:/mining/rewardPublicKey
     * @secure
     */
    miningReadMinerRewardPubkey: (params: RequestParams = {}) =>
      this.request<RewardPubKey, ApiError>({
        path: `/mining/rewardPublicKey`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags mining
     * @name MiningSubmitSolution
     * @summary Submit solution for current candidate
     * @request POST:/mining/solution
     * @secure
     */
    miningSubmitSolution: (data: PowSolutions, params: RequestParams = {}) =>
      this.request<void, ApiError>({
        path: `/mining/solution`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),
  };
  utxo = {
    /**
     * No description
     *
     * @tags utxo
     * @name GetBoxesBinaryProof
     * @summary Get serialized batch proof for given set of boxes
     * @request POST:/utxo/getBoxesBinaryProof
     * @secure
     */
    getBoxesBinaryProof: (data: TransactionBoxId[], params: RequestParams = {}) =>
      this.request<SerializedAdProof, ApiError>({
        path: `/utxo/getBoxesBinaryProof`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags utxo
     * @name GetBoxById
     * @summary Get box contents for a box by a unique identifier.
     * @request GET:/utxo/byId/{boxId}
     */
    getBoxById: (boxId: string, params: RequestParams = {}) =>
      this.request<ErgoTransactionOutput, ApiError>({
        path: `/utxo/byId/${boxId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags utxo
     * @name GetBoxByIdBinary
     * @summary Get serialized box from UTXO pool in Base16 encoding by an identifier.
     * @request GET:/utxo/byIdBinary/{boxId}
     */
    getBoxByIdBinary: (boxId: string, params: RequestParams = {}) =>
      this.request<SerializedBox, ApiError>({
        path: `/utxo/byIdBinary/${boxId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags utxo
     * @name GetBoxWithPoolById
     * @summary Get box contents for a box by a unique identifier, from UTXO set and also the mempool.
     * @request GET:/utxo/withPool/byId/{boxId}
     */
    getBoxWithPoolById: (boxId: string, params: RequestParams = {}) =>
      this.request<ErgoTransactionOutput, ApiError>({
        path: `/utxo/withPool/byId/${boxId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags utxo
     * @name GetBoxWithPoolByIds
     * @summary Get boxes for ids provided, from UTXO or the mempool.
     * @request POST:/utxo/withPool/byIds
     */
    getBoxWithPoolByIds: (data: string[], params: RequestParams = {}) =>
      this.request<ErgoTransactionOutput[], ApiError>({
        path: `/utxo/withPool/byIds`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags utxo
     * @name GetBoxWithPoolByIdBinary
     * @summary Get serialized box in Base16 encoding by an identifier, considering also the mempool.
     * @request GET:/utxo/withPool/byIdBinary/{boxId}
     */
    getBoxWithPoolByIdBinary: (boxId: string, params: RequestParams = {}) =>
      this.request<SerializedBox, ApiError>({
        path: `/utxo/withPool/byIdBinary/${boxId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags utxo
     * @name GetSnapshotsInfo
     * @summary Get information about locally stored UTXO snapshots
     * @request GET:/utxo/getSnapshotsInfo
     */
    getSnapshotsInfo: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/utxo/getSnapshotsInfo`,
        method: "GET",
        ...params,
      }),

    /**
     * @description Error
     *
     * @name DefaultUtxo
     * @request DEFAULT:/utxo/getSnapshotsInfo
     */
    defaultUtxo: (params: RequestParams = {}) =>
      this.request<any, any>({
        path: `/utxo/getSnapshotsInfo`,
        method: "DEFAULT",
        ...params,
      }),

    /**
     * No description
     *
     * @tags utxo
     * @name GenesisBoxes
     * @summary Get genesis boxes (boxes existed before the very first block)
     * @request GET:/utxo/genesis
     */
    genesisBoxes: (params: RequestParams = {}) =>
      this.request<ErgoTransactionOutput[], ApiError>({
        path: `/utxo/genesis`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  script = {
    /**
     * No description
     *
     * @tags script
     * @name ScriptP2SAddress
     * @summary Create P2SAddress from Sigma source
     * @request POST:/script/p2sAddress
     * @secure
     */
    scriptP2SAddress: (data: SourceHolder, params: RequestParams = {}) =>
      this.request<AddressHolder, ApiError>({
        path: `/script/p2sAddress`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags script
     * @name ScriptP2ShAddress
     * @summary Create P2SHAddress from Sigma source
     * @request POST:/script/p2shAddress
     * @secure
     */
    scriptP2ShAddress: (data: SourceHolder, params: RequestParams = {}) =>
      this.request<AddressHolder, ApiError>({
        path: `/script/p2shAddress`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags script
     * @name AddressToTree
     * @summary Convert an address to hex-encoded serialized ErgoTree (script)
     * @request GET:/script/addressToTree/{address}
     */
    addressToTree: (address: ErgoAddress, params: RequestParams = {}) =>
      this.request<ErgoTreeObject, ApiError>({
        path: `/script/addressToTree/${address}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags script
     * @name AddressToBytes
     * @summary Convert an address to hex-encoded Sigma byte array constant which contains script bytes
     * @request GET:/script/addressToBytes/{address}
     */
    addressToBytes: (address: ErgoAddress, params: RequestParams = {}) =>
      this.request<ScriptBytes, ApiError>({
        path: `/script/addressToBytes/${address}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags script
     * @name ExecuteWithContext
     * @summary Execute script with context
     * @request POST:/script/executeWithContext
     * @secure
     */
    executeWithContext: (data: ExecuteScript, params: RequestParams = {}) =>
      this.request<CryptoResult, ApiError>({
        path: `/script/executeWithContext`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  scan = {
    /**
     * No description
     *
     * @tags scan
     * @name RegisterScan
     * @summary Register a scan
     * @request POST:/scan/register
     * @secure
     */
    registerScan: (data: ScanRequest, params: RequestParams = {}) =>
      this.request<ScanId, ApiError>({
        path: `/scan/register`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags scan
     * @name DeregisterScan
     * @summary Stop tracking and deregister scan
     * @request POST:/scan/deregister
     * @secure
     */
    deregisterScan: (data: ScanId, params: RequestParams = {}) =>
      this.request<ScanId, ApiError>({
        path: `/scan/deregister`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags scan
     * @name ListAllScans
     * @summary List all the registered scans
     * @request GET:/scan/listAll
     * @secure
     */
    listAllScans: (params: RequestParams = {}) =>
      this.request<Scan[], ApiError>({
        path: `/scan/listAll`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags scan
     * @name ListUnspentScans
     * @summary List boxes which are not spent.
     * @request GET:/scan/unspentBoxes/{scanId}
     * @secure
     */
    listUnspentScans: (
      scanId: number,
      query?: {
        /**
         * Minimal number of confirmations, -1 means we consider unconfirmed
         * @format int32
         * @min -1
         * @default 0
         */
        minConfirmations?: number;
        /**
         * Maximum number of confirmations, -1 means unlimited
         * @format int32
         * @default -1
         */
        maxConfirmations?: number;
        /**
         * Minimal box inclusion height
         * @format int32
         * @min 0
         * @default 0
         */
        minInclusionHeight?: number;
        /**
         * Maximum box inclusion height, -1 means unlimited
         * @format int32
         * @default -1
         */
        maxInclusionHeight?: number;
        /**
         * amount of elements to retrieve
         * @format int32
         * @min 1
         * @max 2500
         * @default 500
         */
        limit?: number;
        /**
         * The number of items in list to skip
         * @format int32
         * @min 0
         * @default 0
         */
        offset?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<WalletBox[], ApiError>({
        path: `/scan/unspentBoxes/${scanId}`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags scan
     * @name ListSpentScans
     * @summary List boxes which are spent.
     * @request GET:/scan/spentBoxes/{scanId}
     * @secure
     */
    listSpentScans: (
      scanId: number,
      query?: {
        /**
         * Minimal number of confirmations, -1 means we consider unconfirmed
         * @format int32
         * @min -1
         * @default 0
         */
        minConfirmations?: number;
        /**
         * Maximum number of confirmations, -1 means unlimited
         * @format int32
         * @default -1
         */
        maxConfirmations?: number;
        /**
         * Minimal box inclusion height
         * @format int32
         * @min 0
         * @default 0
         */
        minInclusionHeight?: number;
        /**
         * Maximum box inclusion height, -1 means unlimited
         * @format int32
         * @default -1
         */
        maxInclusionHeight?: number;
        /**
         * amount of elements to retrieve
         * @format int32
         * @min 1
         * @max 2500
         * @default 500
         */
        limit?: number;
        /**
         * The number of items in list to skip
         * @format int32
         * @min 0
         * @default 0
         */
        offset?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<WalletBox[], ApiError>({
        path: `/scan/spentBoxes/${scanId}`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags scan
     * @name ScanStopTracking
     * @summary Stop scan-related box tracking
     * @request POST:/scan/stopTracking
     * @secure
     */
    scanStopTracking: (data: ScanIdBoxId, params: RequestParams = {}) =>
      this.request<ScanIdBoxId, ApiError>({
        path: `/scan/stopTracking`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags scan
     * @name ScriptP2SRule
     * @summary Create and register a scan to track P2S address provided
     * @request POST:/scan/p2sRule
     * @secure
     */
    scriptP2SRule: (data: ErgoAddress, params: RequestParams = {}) =>
      this.request<ScanId, ApiError>({
        path: `/scan/p2sRule`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags scan, wallet
     * @name AddBox
     * @summary Adds a box to scans, writes box to database if it is not there. You can use scan number 10 to add a box to the wallet.
     * @request POST:/scan/addBox
     * @secure
     */
    addBox: (data: ScanIdsBox, params: RequestParams = {}) =>
      this.request<TransactionId, ApiError>({
        path: `/scan/addBox`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  node = {
    /**
     * No description
     *
     * @tags node
     * @name NodeShutdown
     * @summary Shuts down the node
     * @request POST:/node/shutdown
     * @secure
     */
    nodeShutdown: (params: RequestParams = {}) =>
      this.request<void, ApiError>({
        path: `/node/shutdown`,
        method: "POST",
        secure: true,
        ...params,
      }),
  };
  emission = {
    /**
     * No description
     *
     * @tags emission
     * @name EmissionAt
     * @summary Get emission data for a given height
     * @request GET:/emission/at/{blockHeight}
     */
    emissionAt: (blockHeight: number, params: RequestParams = {}) =>
      this.request<EmissionInfo, ApiError>({
        path: `/emission/at/${blockHeight}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags emission
     * @name EmissionScripts
     * @summary Print emission-related scripts
     * @request GET:/emission/scripts
     */
    emissionScripts: (params: RequestParams = {}) =>
      this.request<EmissionScripts, ApiError>({
        path: `/emission/scripts`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  blockchain = {
    /**
     * No description
     *
     * @tags blockchain
     * @name GetIndexedHeight
     * @summary Get current indexed block height. (The indexer has processed all blocks up to this height.)
     * @request GET:/blockchain/indexedHeight
     */
    getIndexedHeight: (params: RequestParams = {}) =>
      this.request<
        {
          /**
           * number of blocks indexed
           * @default 0
           */
          indexedHeight?: number;
          /** number of all known blocks */
          fullHeight?: number;
        },
        any
      >({
        path: `/blockchain/indexedHeight`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags blockchain
     * @name GetTxById
     * @summary Retrieve a transaction by its id
     * @request GET:/blockchain/transaction/byId/{txId}
     */
    getTxById: (txId: string, params: RequestParams = {}) =>
      this.request<IndexedErgoTransaction, ApiError>({
        path: `/blockchain/transaction/byId/${txId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags blockchain
     * @name GetTxByIndex
     * @summary Retrieve a transaction by global index number
     * @request GET:/blockchain/transaction/byIndex/{txIndex}
     */
    getTxByIndex: (txIndex: number, params: RequestParams = {}) =>
      this.request<IndexedErgoTransaction, ApiError>({
        path: `/blockchain/transaction/byIndex/${txIndex}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags blockchain
     * @name GetTxsByAddress
     * @summary Retrieve transactions by their associated address
     * @request POST:/blockchain/transaction/byAddress
     */
    getTxsByAddress: (
      data: ErgoAddress,
      query?: {
        /**
         * amount of elements to skip from the start
         * @format int32
         * @default 0
         */
        offset?: number;
        /**
         * amount of elements to retrieve
         * @format int32
         * @default 5
         */
        limit?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /** Array of transactions */
          items?: IndexedErgoTransaction[];
          /** Total count of retrieved transactions */
          total?: number;
        },
        ApiError
      >({
        path: `/blockchain/transaction/byAddress`,
        method: "POST",
        query: query,
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags blockchain
     * @name GetTxRange
     * @summary Get a range of transaction ids
     * @request GET:/blockchain/transaction/range
     */
    getTxRange: (
      query?: {
        /**
         * amount of elements to skip from the start
         * @format int32
         * @default 0
         */
        offset?: number;
        /**
         * amount of elements to retrieve
         * @format int32
         * @default 5
         */
        limit?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<ModifierId[], ApiError>({
        path: `/blockchain/transaction/range`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags blockchain
     * @name GetBoxById
     * @summary Retrieve a box by its id
     * @request GET:/blockchain/box/byId/{boxId}
     */
    getBoxById: (boxId: string, params: RequestParams = {}) =>
      this.request<IndexedErgoBox, ApiError>({
        path: `/blockchain/box/byId/${boxId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags blockchain
     * @name GetBoxByIndex
     * @summary Retrieve a box by global index number
     * @request GET:/blockchain/box/byIndex/{boxIndex}
     */
    getBoxByIndex: (boxIndex: number, params: RequestParams = {}) =>
      this.request<IndexedErgoBox, ApiError>({
        path: `/blockchain/box/byIndex/${boxIndex}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags blockchain
     * @name GetBoxesByTokenId
     * @summary Retrieve boxes by an associated token id
     * @request GET:/blockchain/box/byTokenId/{tokenId}
     */
    getBoxesByTokenId: (
      tokenId: ModifierId,
      query?: {
        /**
         * amount of elements to skip from the start
         * @format int32
         * @default 0
         */
        offset?: number;
        /**
         * amount of elements to retrieve
         * @format int32
         * @default 5
         */
        limit?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /** Array of boxes */
          items?: IndexedErgoBox[];
          /** Total number of retreived boxes */
          total?: number;
        },
        ApiError
      >({
        path: `/blockchain/box/byTokenId/${tokenId}`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags blockchain
     * @name GetBoxesByTokenIdUnspent
     * @summary Retrieve unspent boxes by an associated token id
     * @request GET:/blockchain/box/unspent/byTokenId/{tokenId}
     */
    getBoxesByTokenIdUnspent: (
      tokenId: ModifierId,
      query?: {
        /**
         * amount of elements to skip from the start
         * @format int32
         * @default 0
         */
        offset?: number;
        /**
         * amount of elements to retrieve
         * @format int32
         * @default 5
         */
        limit?: number;
        /**
         * desc = new boxes first ; asc = old boxes first
         * @default "desc"
         */
        sortDirection?: string;
        /**
         * if true include unconfirmed transactions from mempool
         * @default false
         */
        includeUnconfirmed?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<IndexedErgoBox[], ApiError>({
        path: `/blockchain/box/unspent/byTokenId/${tokenId}`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags blockchain
     * @name GetBoxesByAddress
     * @summary Retrieve boxes by their associated address
     * @request POST:/blockchain/box/byAddress
     */
    getBoxesByAddress: (
      data: ErgoAddress,
      query?: {
        /**
         * amount of elements to skip from the start
         * @format int32
         * @default 0
         */
        offset?: number;
        /**
         * amount of elements to retrieve
         * @format int32
         * @default 5
         */
        limit?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /** Array of boxes */
          items?: IndexedErgoBox[];
          /** Total number of retreived boxes */
          total?: number;
        },
        ApiError
      >({
        path: `/blockchain/box/byAddress`,
        method: "POST",
        query: query,
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags blockchain
     * @name GetBoxesByAddressUnspent
     * @summary Retrieve unspent boxes by their associated address
     * @request POST:/blockchain/box/unspent/byAddress
     */
    getBoxesByAddressUnspent: (
      data: ErgoAddress,
      query?: {
        /**
         * amount of elements to skip from the start
         * @format int32
         * @default 0
         */
        offset?: number;
        /**
         * amount of elements to retrieve
         * @format int32
         * @default 5
         */
        limit?: number;
        /**
         * desc = new boxes first ; asc = old boxes first
         * @default "desc"
         */
        sortDirection?: string;
        /**
         * if true include unconfirmed transactions from mempool
         * @default false
         */
        includeUnconfirmed?: boolean;
        /**
         * if true exclude spent inputs from mempool
         * @default false
         */
        excludeMempoolSpent?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<IndexedErgoBox[], ApiError>({
        path: `/blockchain/box/unspent/byAddress`,
        method: "POST",
        query: query,
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags blockchain
     * @name GetBoxRange
     * @summary Get a range of box ids
     * @request GET:/blockchain/box/range
     */
    getBoxRange: (
      query?: {
        /**
         * amount of elements to skip from the start
         * @format int32
         * @default 0
         */
        offset?: number;
        /**
         * amount of elements to retrieve
         * @format int32
         * @default 5
         */
        limit?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<ModifierId[], ApiError>({
        path: `/blockchain/box/range`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags blockchain
     * @name GetBoxesByErgoTree
     * @summary Retrieve boxes by their associated ergotree
     * @request POST:/blockchain/box/byErgoTree
     */
    getBoxesByErgoTree: (
      data: ErgoAddress,
      query?: {
        /**
         * amount of elements to skip from the start
         * @format int32
         * @default 0
         */
        offset?: number;
        /**
         * amount of elements to retrieve
         * @format int32
         * @default 5
         */
        limit?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /** Array of boxes */
          items?: IndexedErgoBox[];
          /** Total number of retreived boxes */
          total?: number;
        },
        ApiError
      >({
        path: `/blockchain/box/byErgoTree`,
        method: "POST",
        query: query,
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags blockchain
     * @name GetBoxesByErgoTreeUnspent
     * @summary Retrieve unspent boxes by their associated ergotree
     * @request POST:/blockchain/box/unspent/byErgoTree
     */
    getBoxesByErgoTreeUnspent: (
      data: ErgoAddress,
      query?: {
        /**
         * amount of elements to skip from the start
         * @format int32
         * @default 0
         */
        offset?: number;
        /**
         * amount of elements to retrieve
         * @format int32
         * @default 5
         */
        limit?: number;
        /**
         * desc = new boxes first ; asc = old boxes first
         * @default "desc"
         */
        sortDirection?: string;
        /**
         * if true include unconfirmed transactions from mempool
         * @default false
         */
        includeUnconfirmed?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /** Array of boxes */
          items?: IndexedErgoBox[];
          /** Total number of retreived boxes */
          total?: number;
        },
        ApiError
      >({
        path: `/blockchain/box/unspent/byErgoTree`,
        method: "POST",
        query: query,
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags blockchain
     * @name GetTokenById
     * @summary Retrieve minting information about a token
     * @request GET:/blockchain/token/byId/{tokenId}
     */
    getTokenById: (tokenId: string, params: RequestParams = {}) =>
      this.request<IndexedToken, ApiError>({
        path: `/blockchain/token/byId/${tokenId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags blockchain
     * @name GetTokensByIds
     * @summary Retrieve minting information about a list of tokens
     * @request POST:/blockchain/tokens
     */
    getTokensByIds: (data: string[], params: RequestParams = {}) =>
      this.request<IndexedToken[], ApiError>({
        path: `/blockchain/tokens`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags blockchain
     * @name GetAddressBalanceTotal
     * @summary Retrieve confirmed and unconfirmed balance of an address
     * @request POST:/blockchain/balance
     */
    getAddressBalanceTotal: (data: ErgoAddress, params: RequestParams = {}) =>
      this.request<
        {
          /** Balance information */
          confirmed?: BalanceInfo;
          /** Balance information */
          unconfirmed?: BalanceInfo;
        },
        ApiError
      >({
        path: `/blockchain/balance`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
}
