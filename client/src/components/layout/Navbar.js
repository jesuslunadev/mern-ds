import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {useAuth} from "../../context/AuthContext";

/**
 * Navbar component.
 *
 * This component renders the navigation bar of the application.
 *
 * @returns {JSX.Element} The rendered JSX element.
 */
const Navbar = () => {

  const {user} = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setIsAdmin(user && user.role.role === "Administrador")
  }, [user]);


  return (
      <nav className="bg-gradient-to-r from-blue-500 to-indigo-500 shadow-lg p-4 m-4" style={{
        borderRadius: "30px"
      }}>
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-white text-lg font-bold">DS</Link>
          <div className="space-x-4">
            {!user && <Link to="/iniciar-sesion" className="text-white hover:text-blue-100">Login</Link>
            }
            <Link to="/contribuir" className="text-white hover:text-blue-100">
              Subir Contenido
            </Link>
            {
                isAdmin && (
                    <span className="text-white hover:text-blue-100">
                      <i className="fa-solid fa-user-tie mx-2"></i>
                      <Link to="/admin" className="text-white hover:text-blue-100">Sección Admin</Link>
                    </span>
                )
            }
          </div>
        </div>
      </nav>
  );
};

export default Navbar;