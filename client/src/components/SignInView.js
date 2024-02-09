import logo from '../assets/logo.png';
import {useContext, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";
import { useNavigate } from 'react-router-dom';

/**
 * Sign in a view component.
 * @returns {JSX.Element} The sign in view component JSX.
 */
function SignInView() {

  const {login, user} = useContext(AuthContext);
  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("testPassword");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const handleMouseMove = (e) => {
    setX(e.clientX / 100);
    setY(e.clientY / 100);
  }

  const handleSubmit = async (event) => {

    setError(false)
    event.preventDefault();
    const response = await login(email, password);

    if (response.hasOwnProperty("error")) {
      setError(true);
      return;
    }

    navigate("/");
  };

  return (
      <div
          className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
          onMouseMove={handleMouseMove}
          style={{
            background: 'linear-gradient(270deg, #3b82f6, #6366f1)',
            backgroundSize: '3s00% 100%',
            animation: 'gradient-animation 10s ease infinite',
          }}
      >
        <div className="max-w-md w-full space-y-8 shadow-lg p-6 bg-white" style={{
          borderRadius: "30px",
          transform: `translate(${x}px, ${y}px)`
        }}>
          <div>
            <img src={logo} className="m-auto h-20" alt=""/>
            <h2 className="mt-6 text-center text-3xl font-black text-black">
              Inicia sesión en tu cuenta
            </h2>
          </div>
          <form className="mt-8 space-y-6">
            <input type="hidden" name="remember" value="true"/>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">Email</label>
                <input id="email-address" name="email" type="email"
                       value={email}
                       onChange={handleEmailChange}
                       autoComplete="email" required
                       className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300
                     placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500
                     focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="Correo electrónico"/>
              </div>
              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <input id="password" name="password"
                       value={password}
                       onChange={handlePasswordChange}
                       type="password" autoComplete="current-password" required
                       className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300
                     placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500
                     focus:border-blue-500 focus:zfocus:border-blue-500 focus:z-10 sm:text-sm"
                       placeholder="Contraseña"/>
              </div>
            </div>
            <div>
              <button onClick={handleSubmit}
                      className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Iniciar sesión
              </button>
              {error && <div className="text-red-600 text-center my-4 text-1xl">
                Usuario o contraseña inválidos
              </div>}
              <div className="mt-3 text-center">
                <span className="text-xs">
                  ¿No tienes cuenta?
                  <Link to="/registrarse" className="font-bold">
                    Regístrate
                  </Link>
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
  );

}

export default SignInView;