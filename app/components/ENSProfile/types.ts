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
