import {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";
import logo from "../assets/logo.png";
import useApi from "../hooks/useAPI";



/**
 * Represents a sign-up view component.
 *
 * @returns {JSX.Element} The sign-up view component.
 */
function SignUpView() {
  const {register, user} = useContext(AuthContext);
  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("12345678");
  const [userName, setUserName] = useState("admin");
  const [role, setRole] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const [roles, setRoles] = useState([]);
  const {data} = useApi("users/available-roles");

  useEffect(() => {
    setRoles(data.filter(item => item.role !== "Administrador"));
  }, [data]);

  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handleUserNameChange = (event) => setUserName(event.target.value);
  const handleRoleChange = (event) => setRole(event.target.value);

  const handleSubmit = async (event) => {

    event.preventDefault();

    setError(false);

    if (![email, password, role, userName].every(
        item => item !== ""
    )) {
      setError("Por favor llena todos los campos");
      return;
    }

    const response = await register({email, password, username: userName, role});

    if (response.hasOwnProperty("error")) {
      setError(response.error.serverMessage);
      return;
    }

    setEmail("");
    setPassword("");
    setUserName("");
    setRole(null);

    navigate("/");

  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
      <div className="flex  min-h-screen w-full">
        <div style={{
          borderRadius: "30px"
        }}
             className="w-full m-4 flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-500">
          <span className="font-black  text-5xl text-white">Regístrate</span>
          <span className="mt-4 text-white">Llena los campos solicitados para crear tu cuenta</span>
        </div>
        <div className="w-full flex flex-col  justify-center p-10">
          <div>
            <img className="m-auto h-20 my-10" src={logo} alt=""/>
            <div>
              <label htmlFor="username" className="sr-only">Nombre de usuario</label>
              <input id="username" name="username"
                     value={userName}
                     onChange={handleUserNameChange}
                     type="text" autoComplete="username" required
                     className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300
                     placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500
                     focus:border-blue-500 focus:z-10 sm:text-sm"
                     placeholder="Nombre de usuario"/>
            </div>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">Email</label>
                <input id="email-address" name="email" type="email"
                       value={email}
                       onChange={handleEmailChange}
                       autoComplete="email" required
                       className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300
                     placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500
                     focus:border-blue-500 focus:zfocus:border-blue-500 focus:z-10 sm:text-sm"
                       placeholder="Correo electrónico"/>
              </div>
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
            <div>
              <label htmlFor="role" className="sr-only">Rol</label>
              <select value={role} onChange={handleRoleChange} className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300
                     placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500
                     focus:border-blue-500 focus:zfocus:border-blue-500 focus:z-10 sm:text-sm" name="role" id="role">
                <option value="" disabled>Elige un rol</option>
                {roles.map(rol => (
                    <option key={rol._id} value={rol._id}>{rol.role}</option>
                ))}
              </select>
            </div>
          </div>
          <button onClick={handleSubmit}
                  className="group relative mt-4 w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Registrarse
          </button>
          {error && <div className="text-red-600 text-center my-4 text-1xl">
            {error}
          </div>}
        </div>
      </div>
  )
}

export default SignUpView;