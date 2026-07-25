import { useRouter } from "next/router";
import React, { createContext, useState } from "react";

export const GlobalAction = createContext();

const ActionProvider = ({ children }) => {
  const [action, setAction] = useState({ isLoading: false, purpose: "" });
  const router = useRouter();
  const [user, setUser] = useState(null);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const user_data = localStorage.getItem("userData");
      if (user_data) {
        setUser(JSON.parse(user_data));
      }
    }
  }, []);
  return (
    <GlobalAction.Provider
      value={{
        action,
        setAction,
        router,
        user,
      }}
    >
      {children}
    </GlobalAction.Provider>
  );
};

export default ActionProvider;
