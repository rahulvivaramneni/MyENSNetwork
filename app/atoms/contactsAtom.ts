import { atom } from "recoil";

export const contactsAtom = atom({
  key: "contactstState", // unique ID (with respect to other atoms/selectors)
  default: [] as string[], // default value (aka initial value)
});
