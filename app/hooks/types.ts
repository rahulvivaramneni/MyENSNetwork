export interface IENSProfile {
  isMigrated: boolean | null;
  createdAt: string | null;
  address?: string | undefined;
  name?: string | null | undefined;
  match?: boolean | undefined;
  message?: string | undefined;
  records?:
    | {
        contentHash?: any | null | undefined;
        texts?:
          | {
              key: string | number;
              type: "addr" | "text" | "contentHash";
              coin?: string | undefined;
              value: string;
            }[]
          | undefined;
        coinTypes?:
          | {
              key: string | number;
              type: "addr" | "text" | "contentHash";
              coin?: string | undefined;
              value: string;
              addr?: string;
            }[]
          | undefined;
      }
    | undefined;
  resolverAddress?: string | undefined;
  reverseResolverAddress?: string | undefined;
}

export interface ITransfer {
  key: string;
  date: string;
  transferFlow: string;
  from: string;
  to: string;
  tokenName: string;
  tokenSymbol: string;
  tokenLogo: string;
  transferValue: number;
  tokenAddress: string;
  txnHash: string;
  isMultipleTransfers: boolean;
  isERC721: boolean;
  multipleTransfers: any[];
}
