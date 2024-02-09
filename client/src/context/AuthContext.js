import React, {createContext, useContext, useState} from 'react';
import {useNavigate} from "react-router-dom";

export const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

/**
 * AuthProvider is a React component that provides authentication functionalities to its children components.
 * It uses the AuthContext to share the user information and authentication methods.
 *
 * @component
 * @param {object} props - The props of the component.
 * @param {ReactNode} props.children - The children components.
 * @returns {React.JSX.Element} The rendered React element.
 */
export const AuthProvider = ({children}) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");


    if (!storedUser) {
      return null;
    }

    const parsedUser = JSON.parse(storedUser);
    parsedUser.token = token;

    return parsedUser;
  });


  /**
   * Authenticates a user by logging in with their email and password.
   *
   * @param {string} email - The email of the user.
   * @param {string} password - The password of the user.
   * @returns {Promise<Object>} - A promise that resolves to an object with either a success or error property.
   * @throws {Error} - An error is thrown if there is an issue with the API request or if the response is not successful.
   */
  const login = async (email, password) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users/auth/login`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email, password})
      });

      const {user, token, message} = await response.json();

      if (!response.ok) {
        throw {
          serverMessage: message,
          message: `An error has occurred: ${response.statusText}`,
          status: response.status
        };
      }

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);


      setUser({
        ...user, token
      });

      return {success: true}
    } catch (error) {
      return {error: error}
    }
  }


  /**
   * Registers a user.
   *
   * @param {Object} payload - The payload containing registration data.
   * @param {string} payload.email - The email of the user.
   * @param {string} payload.password - The password of the user.
   * @param {string} payload.username - The username of the user.
   * @param {string} payload.role - The role of the user.
   * @returns {Promise<object>} - A Promise that resolves to an object indicating the success or failure of the registration.
   * @throws {Error} - If an error occurs during registration.
   */
  const register = async (payload) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users/register`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          username: payload.username,
          role: payload.role
        })
      });

      const responseJSON = await response.json();

      if (!response.ok) {
        throw {
          serverMessage: responseJSON.message,
          message: `An error has occurred: ${response.statusText}`,
          status: response.status
        };
      }

      await login(payload.email, payload.password);

      return {success: true}
    } catch (error) {
      console.log(error.status);
      return {error: error}
    }
  }

  /**
   * Logs out the user by removing user information from local storage
   * and setting the current user to null.
   *
   * @function logout
   * @returns {void}
   */
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/iniciar-sesion")
  };


  /**
   * Check if the current user is an admin.
   *
   * @returns {boolean} - True if the user is an admin, false otherwise.
   */
  const userIsAdmin = () => {
    if (!user) {
      return false;
    }
    return user?.role?.role === 'Administrador' ?? false;
  }

  return (
      <AuthContext.Provider value={{user, login, logout, register, userIsAdmin}}>
        {children}
      </AuthContext.Provider>
  );
};
