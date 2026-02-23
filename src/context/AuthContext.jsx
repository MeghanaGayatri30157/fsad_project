import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [users, setUsers] = useState({});

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    const storedUsers = localStorage.getItem('allUsers');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
  }, []);

  const signup = (email, password, name, role) => {
    const newUser = {
      id: Date.now().toString(),
      email,
      password,
      name,
      role,
      createdAt: new Date()
    };

    const updatedUsers = { ...users, [email]: newUser };
    setUsers(updatedUsers);
    localStorage.setItem('allUsers', JSON.stringify(updatedUsers));
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    setUser(newUser);
    setIsAuthenticated(true);
    return newUser;
  };

  const login = (email, password) => {
    const foundUser = users[email];
    if (foundUser && foundUser.password === password) {
      setUser(foundUser);
      setIsAuthenticated(true);
      localStorage.setItem('currentUser', JSON.stringify(foundUser));
      return { success: true, user: foundUser };
    }
    return { success: false, error: 'Invalid credentials' };
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
