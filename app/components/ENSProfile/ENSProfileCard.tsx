import { useEffect, useState } from "react";
import IcoChevronDown12 from "./ico_chevron_down12";
import { IENSProfile } from "./types";
import truncateEthAddress from "truncate-eth-address";
import { SocialIcon } from "react-social-icons";
import Jazzicon from "react-jazzicon";
import { useRecoilState } from "recoil";
import { contactsAtom } from "../../atoms/contactsAtom";
import { ethers, utils } from "ethers";
import axios from "axios";

import IcoX from "./IcoX";
import { response } from "express";

interface EnsComponentExpandedInterface {
  ENSProfile: IENSProfile;
  address: string;
  profileInfo: any;
}

export default function ENSProfileCard({
  ENSProfile,
  address,
  profileInfo,
}: EnsComponentExpandedInterface) {
  const [collapsed, setCollapsed] = useState(true);
  const [contacts, setContacts] = useRecoilState(contactsAtom);
  const [deleted, setDeleted] = useState(false);
  const [regDate, setRegDate] = useState(1688952255);
  const [expDate, setExpDate] = useState(1625838351);
  //setRegDate("1688952255")
  // setExpDate("1625838351")
  const [showQrModal, setShowQrModal] = useState<boolean>(false);
  const [qrModalInfo, setQtModalInfo] = useState<{
    address?: string;
    coin?: string;
  }>({});
  const qr = (qrAddress: string) =>
    `https://chart.googleapis.com/chart?chs=420x420&cht=qr&chco=333333333&chl=${qrAddress}&choe=UTF-8`;

  const addressForJazzIcon = utils.isAddress(address)
    ? address
    : ENSProfile.address
    ? ENSProfile.address
    : "666";

  const jazzIconSeed = parseInt(
    Math.round(Math.random() * Number(addressForJazzIcon)).toString()
  );

  const handleDeleteContact = () => {
    const filtered: string[] = contacts.filter(
      (contact: string) => !(contact === address)
    );

    if (typeof window !== "undefined") {
      setContacts(filtered);
      localStorage.setItem("My0xContacts", JSON.stringify(filtered));
    }
  };

  const handleCollapse = () => {
    setCollapsed(!collapsed);
  };

  interface qrInfo {
    address: string;
    coin: string;
  }

  const handleQrModal = (info: qrInfo) => {
    setQtModalInfo(info);
    setShowQrModal(true);
  };
let response:any;
let expdate:any;
  async function getUserQuestions() {
    try {
       response = await axios.post(
        "https://api.thegraph.com/subgraphs/name/ensdomains/ens",
        {
          query: `{
            domains(where:{name:"rahul.eth"})
            {
              name
              labelhash
              createdAt
              labelName
            }
            
            registrations(first: 1, where: {id: "0x93af1d2e6382871bfb4ec7d7c2fc4895a7cd11808647036276e114649be13512"}) 
            {
              id
              registrationDate
              expiryDate
            }
          
          }`
        });
        expdate = response.data["data"].registrations;

    } catch (error) {
        console.error(error);
    }
}

getUserQuestions()

//console.log(typeof expdate)
const expiDate=new Date(regDate * 1000)
const regiDate=new Date(expDate * 1000)


  return (
    <>
      {!collapsed && !showQrModal && (
        <div
          className="inline-flex w-[460px] flex-col items-start gap-4 
                        rounded-2xl border-4 border-solid border-[rgba(242,242,242,1)]
                        bg-white px-4 py-5 text-left font-['Roboto_Mono'] 
                        font-bold drop-shadow-lg"
        >
          <div className="flex w-[428px] items-center gap-2 self-stretch text-xl leading-7 text-black">
            <Jazzicon diameter={40} seed={jazzIconSeed} />
            {/* NAME */}
            <div className="flex-1 gap-1">
              <p className="w-full">
                {ENSProfile?.name
                  ? ENSProfile.name
                  : truncateEthAddress(address)}
              </p>
            </div>
            <button className="cursor-pointer" onClick={() => handleCollapse()}>
              <IcoChevronDown12 />
            </button>
          </div>
          {/* SPACER */}
          <div className="text-[undefined] text-[undefined] h-[0] w-[428px] rounded-full leading-[undefined] outline outline-[3px] outline-[rgba(242,242,242,1)]" />
          {/* DESCRIPTION */}
          <div className="flex w-[428px] items-start gap-1 self-stretch text-base leading-6 text-black">
            <p>
              {ENSProfile ? profileInfo.description : "no profile description"}
            </p>
          </div>
          {/* KEY TEXT VALUES */}
          <div className="flex w-[428px] flex-col items-start gap-1 self-stretch text-base leading-6">
            {ENSProfile &&
              ENSProfile.records?.texts?.map(
                (item) =>
                  !item.value.includes("https") && (
                    <div className="flex w-[268px] items-start gap-1">
                      <p className="text-[rgba(130,130,130,1)]">{item.key}</p>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(item.value);
                        }}
                        className={`text-black ${
                          item.value.length > 40 &&
                          "overflow-ellipsis overflow-clip w-80"
                        }`}
                      >
                        {item.value}
                      </button>
                    </div>
                  )
              )}
          </div>
     
          <div className="flex w-[428px] items-center gap-1 self-stretch text-base leading-6 text-[rgba(130,130,130,1)]">
            <p className="uppercase">Registeration Date: </p>
            
            <p className="text-[rgba(0,0,10,1)]">{regiDate.toDateString()}</p>
          </div>
          <div className="flex w-[428px] items-center gap-1 self-stretch text-base leading-6 text-[rgba(130,130,130,1)]">
            <p className="uppercase">Expiry Date: </p>
            
            <p className="text-[rgba(0,0,10,1)]">{expiDate.toDateString()}</p>
          </div>
          {/* ADDRESSES */}
          <div className="flex w-[428px] items-center gap-1 self-stretch text-base leading-6 text-[rgba(130,130,130,1)]">
            <p className="uppercase">Addresses</p>
          </div>
          <div className="flex w-[428px] flex-col items-start gap-1 self-stretch text-base leading-6">
            <div className="flex w-[268px] flex-col items-start gap-1">
              {ENSProfile &&
                ENSProfile.records?.coinTypes?.map((item) => (
                  <>
                    <p className="text-[rgba(130,130,130,1)]">{item.coin}</p>
                    <p className="text-black">{item.addr}</p>
                    <div className="flex items-start gap-2">
                      <button
                        className="text-[rgba(82,0,255,1)]"
                        onClick={() => {
                          handleQrModal({
                            address: item.addr ? item.addr : "",
                            coin: item.coin ? item.coin : "",
                          });
                        }}
                      >
                        QR code
                      </button>

                      <p className="text-black">
                        <br />
                      </p>
                      <p className="text-[rgba(82,0,255,1)]">
                        <p>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(
                                ENSProfile.address
                                  ? ENSProfile.address
                                  : address
                              );
                            }}
                          >
                            Copy address
                          </button>
                        </p>
                      </p>
                    </div>
                  </>
                ))}
            </div>
          </div>
          <div className="flex w-[428px] items-center gap-1 self-stretch text-base leading-6 text-[rgba(130,130,130,1)]">
            <p className="uppercase">Socials</p>
          </div>
          {/* SOCIALS */}
          <div className="text-[undefined] text-[undefined] flex items-start gap-4 leading-[undefined]">
            {ENSProfile?.records?.texts &&
              ENSProfile.records?.texts.map((item) => {
                return (
                  item.value.includes("https") && (
                    <SocialIcon
                      url={item.value}
                      fgColor="#333"
                      bgColor="transparent"
                    />
                  )
                );
              })}
          </div>
          <div className="flex w-[428px] items-center gap-1 self-stretch text-base leading-6 text-[rgba(255,0,0,1)]">
            <button onClick={() => handleDeleteContact()}>
              Delete contact
            </button>
          </div>
        </div>
      )}
      {showQrModal && !collapsed && (
        <div className="z-40">
          <div
            className="inline-flex flex-col items-center justify-center gap-2 rounded-2xl 
          bg-white py-8 pl-[26px] pr-[26px] text-center font-['Roboto_Mono'] leading-7 
          text-black shadow-gray6 border-4 border-gray6 shadow-[-4px_4px_0px_0px]"
          >
            <div className="flex w-[420px] items-start gap-4 self-stretch text-xl font-bold">
              <div className="h-6 w-6 opacity-[undefined]" />
              <p className="h-6 w-[340px]">
                {ENSProfile.name ? ENSProfile.name : address}
              </p>
              <button onClick={() => setShowQrModal(false)}>
                <IcoX />
              </button>
            </div>
            <p className="w-full text-sm font-mono">
              {qrModalInfo.coin}:
              <span className="w-full text-sm font-mono">
                {qrModalInfo.address}
              </span>
            </p>
            <img
              src={qr(
                qrModalInfo?.address
                  ? qrModalInfo.address
                  : "https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley"
              )}
              className="h-[520px] w-[420px] object-cover"
            />
          </div>
        </div>
      )}

      {collapsed && (
        <>
          <div
            className="inline-flex w-[460px] flex-col items-start gap-4 
          rounded-2xl border-4 border-solid border-[rgba(242,242,242,1)] 
          bg-white px-4 py-5 text-left font-['Roboto_Mono'] text-xl font-bold leading-7
          text-black drop-shadow-lg "
          >
            <div className="flex w-[428px] items-center gap-2 self-stretch">
              <div className="h-10 w-10 rounded-full" />
              <Jazzicon diameter={40} seed={jazzIconSeed} />
              <div className="flex-1 gap-1">
                <p className="w-full">
                  {ENSProfile?.name
                    ? ENSProfile.name
                    : truncateEthAddress(address)}
                </p>
              </div>
              <button onClick={() => handleCollapse()}>
                <IcoChevronDown12 />
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
