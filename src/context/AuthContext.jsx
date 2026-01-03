import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
              const [user, setUser] = useState(
                            JSON.parse(localStorage.getItem("user")) || null
              );

              const login = (email, password) => {
                            if (email === "admin@gmail.com" && password === "admin1234") {
                                          const data = { role: "admin", email };
                                          setUser(data);
                                          localStorage.setItem("user", JSON.stringify(data));
                                          return "admin";
                            }

                            if (email === "customer@gmail.com" && password === "customer1234") {
                                          const data = { role: "customer", email };
                                          setUser(data);
                                          localStorage.setItem("user", JSON.stringify(data));
                                          return "customer";
                            }

                            return null;
              };

              const logout = () => {
                            setUser(null);
                            localStorage.removeItem("user");
              };

              return (
                            <AuthContext.Provider value={{ user, login, logout }}>
                                          {children}
                            </AuthContext.Provider>
              );
};
