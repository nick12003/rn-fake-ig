import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "./firebase";
import { SignOutStack, SignedInStack } from "./navigation";

const AuthNavigation = () => {
  const [currentUser, setCurrentUser] = useState(null);

  const userHandle = (user) => setCurrentUser(user ?? null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      userHandle(user);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  return <>{currentUser ? <SignedInStack /> : <SignOutStack />}</>;
};

export default AuthNavigation;
