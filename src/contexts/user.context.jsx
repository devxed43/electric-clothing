import { createContext, useState, useEffect } from "react";
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "../utils/firebase.utils";

// values to access
export const UserContext = createContext({
  // empty states
  currentUser: null,
  setCurrentUser: () => null,
});

// component to wrap around other components and give access
export const UserProvider = ({ children }) => {
  // this just gives ability
  const [currentUser, setCurrentUser] = useState(null);

  // grabs auth and creates user document in db
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  //   value is what gets passed into the children
  const value = { currentUser, setCurrentUser };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
