import { createContext, useState } from "react";

export const AuthContext = createContext();

const validUsers = {
  admin: {
    email: "admin@gmail.com",
    password: "admin1234",
    role: "admin",
  },
  customer: {
    email: "customer@gmail.com",
    password: "customer1234",
    role: "customer",
  },
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("authUser")) || null
  );

  const login = (email, password) => {
    const foundUser = Object.values(validUsers).find(
      (u) => u.email === email && u.password === password
    );

    if (!foundUser) {
      alert("Invalid email or password");
      return false;
    }

    localStorage.setItem("authUser", JSON.stringify(foundUser));
    setUser(foundUser);
    return foundUser.role;
  };

  const logout = () => {
    localStorage.removeItem("authUser");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
