import React, { useEffect, useState } from "react";
import { useENS } from "../../hooks";

import ENSProfileCard from "./ENSProfileCard";

interface Props {
  address: string;
  // profile: IENSProfile | undefined | null;
}

export const ENSProfileComponent = ({ address }: Props) => {
  const { ENSProfile, getProfile } = useENS("https://cloudflare-eth.com/");

  useEffect(() => {
    getProfile(address);
  }, [address]);

  const profileInfo: any = {};
  ENSProfile?.records?.texts?.map(
    (item) => (profileInfo[item.key] = item.value)
  );

  return (
    /* CARD */
    <div>
      {ENSProfile && (
        <ENSProfileCard
          ENSProfile={ENSProfile}
          address={address}
          profileInfo={profileInfo}
        />
      )}
    </div>
  );
};
