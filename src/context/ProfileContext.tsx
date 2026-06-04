import { createContext, useContext, type ReactNode } from "react";
import useProfile from "../hooks/useProfile";

type ProfileContextType = ReturnType<typeof useProfile>;

const ProfileContext = createContext<ProfileContextType | null>(null);

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const value = useProfile();

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
};

export const useProfileContext = () => {
  const context = useContext(ProfileContext);
  if (!context)
    throw new Error("useProfileContext must be used within ProfileProvider");
  return context;
};
