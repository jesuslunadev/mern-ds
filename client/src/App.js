import './App.css';
import {AuthProvider} from "./context/AuthContext";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import MainView from "./components/MainView";
import SignInView from "./components/SignInView";
import SignUpView from "./components/SignUpView";
import PrivateRoute from "./components/PrivateRoute";
import ContributeView from "./components/ContributeView";
import ProfileView from "./components/ProfileView";
import AdminRoute from "./components/AdminRoute";
import AdminView from "./components/AdminView";
import {WebSocketProvider} from './context/WebsocketContext';


/**
 * Creates the main application component.
 *
 * @return {ReactElement} The main application component.
 */
function App() {
  return (
      <Router>
        <AuthProvider>
          <WebSocketProvider>
            <Routes>
              <Route path="/" element={<MainView/>}/>
              <Route path="/iniciar-sesion" element={<SignInView/>}/>
              <Route path="/registrarse" element={<SignUpView/>}/>
              <Route element={<PrivateRoute/>}>
                <Route path="/contribuir" element={<ContributeView/>}/>
                <Route path="/perfil" element={<ProfileView/>}/>
              </Route>
              <Route element={<AdminRoute/>}>
                <Route path="/admin" element={<AdminView/>}/>
              </Route>
            </Routes>
          </WebSocketProvider>
        </AuthProvider>
      </Router>
  );
}


export default App;
