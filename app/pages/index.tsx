/* HOOKS */
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

/* STATE */
import { contactsAtom } from "../atoms/contactsAtom";

/* CONMPONENTS */
import Layout from "../components/Layout";
import { ENSProfileComponent } from "../components/ENSProfile";
import AddressInput from "../components/InputGroup/AddressInput";

/* TYPES */
import type { NextPage } from "next";

const Home: NextPage = () => {
  const [initialized, setInitialized] = useState(false);
  const [contacts, setContacts] = useRecoilState(contactsAtom);

  // load from local storage if available and contacts empty, only once
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedContacts = localStorage.getItem("My0xContacts");
      const storedContactsJSON = JSON.parse(
        storedContacts ? storedContacts : "[]"
      );
      if (
        contacts.length === 0 &&
        storedContactsJSON.length !== 0 &&
        !initialized
      ) {
        console.log("not initialized");
        setContacts(storedContactsJSON);
        setInitialized(true);
      }
    }
  }, [contacts, initialized]);

  return (
    <Layout>
      <AddressInput />
      <div className={`grid grid-cols-2 gap-4`}>
        {contacts.map((contact) => {
          return (
            <>
              <ENSProfileComponent address={contact} />
            </>
          );
        })}
      </div>
    </Layout>
  );
};

export default Home;
