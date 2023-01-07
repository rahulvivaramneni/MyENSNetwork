import { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";
import { ENS } from "@ensdomains/ensjs";
import { IENSProfile } from "./types";

export function useENS(rpc: string) {
  const [ENSProfile, setENSProfile] = useState<IENSProfile | undefined>(
    undefined
  );

  const getProfile = useCallback(
    (account: string) => {
      const fetchENSProfile = async (address: string) => {
        console.log("start fetching");
        const ENSInstance = new ENS();
        const provider = new ethers.providers.JsonRpcProvider(rpc);
        await ENSInstance.setProvider(provider);

        const profile: IENSProfile | undefined = address
          ? await ENSInstance.getProfile(address)
          : undefined;
        // console.log("fetched profile: ", profile);
        if (profile) {
          setENSProfile(profile);
        } else {
          setENSProfile(undefined);
        }
      };
      if (account) {
        console.log("has account", account);
        fetchENSProfile(account);
      }
    },
    [ENSProfile]
  );
  return { ENSProfile, getProfile };
}
export default useENS;
