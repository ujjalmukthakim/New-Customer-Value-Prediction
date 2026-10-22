import { createContext, useCallback, useMemo, useState } from "react";
import { loginRequest } from "../services/authService";
import {
  clearSession,
  getStoredUser,
  saveSession,
} from "../utils/storage";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getStoredUser);

  const signIn = useCallback(async (credentials) => {
    const result = await loginRequest(credentials);
    saveSession(result);
    setUser(result.user);
    return result;
  }, []);

  const signOut = useCallback(() => {
    clearSession();
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, isAuthenticated: Boolean(user), signIn, signOut }),
    [user, signIn, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}